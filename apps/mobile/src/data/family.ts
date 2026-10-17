import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from './supabase';

export type FamilyMember = { id: string; first_name: string; age: number };

/** Kids sessions are for ages 6–14 (§9.4); the table enforces the same limits. */
export const CHILD_AGE = { min: 6, max: 14 } as const;
export const NAME_MAX = 40;

const arabicDigits = /[٠-٩]/g;
const toLatinDigits = (s: string) => s.replace(arabicDigits, (d) => String(d.charCodeAt(0) - 0x0660));

export type FamilyMemberErrors = { name?: 'nameRequired' | 'nameTooLong'; age?: 'ageRange' };

/** Validates the Add/Edit family member sheet. Age accepts Arabic-Indic digits too. */
export function validateFamilyMember(name: string, ageText: string) {
  const firstName = name.trim();
  const digits = toLatinDigits(ageText.trim());
  const age = /^\d{1,2}$/.test(digits) ? Number(digits) : NaN;
  const errors: FamilyMemberErrors = {};
  if (!firstName) errors.name = 'nameRequired';
  else if (firstName.length > NAME_MAX) errors.name = 'nameTooLong';
  if (!(age >= CHILD_AGE.min && age <= CHILD_AGE.max)) errors.age = 'ageRange';
  const ok = !errors.name && !errors.age;
  return { ok, errors, value: ok ? { first_name: firstName, age } : null };
}

export function useFamily(userId: string | undefined) {
  return useQuery({
    queryKey: ['family', userId],
    enabled: Boolean(userId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('family_members')
        .select('id, first_name, age')
        .order('created_at');
      if (error) throw error;
      return data as FamilyMember[];
    },
  });
}

/** Inserts, or updates when `id` is given. RLS scopes rows to the signed-in user. */
export function useSaveFamilyMember(userId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (m: { id?: string; first_name: string; age: number }) => {
      const { error } = m.id
        ? await supabase
            .from('family_members')
            .update({ first_name: m.first_name, age: m.age })
            .eq('id', m.id)
        : await supabase
            .from('family_members')
            .insert({ user_id: userId, first_name: m.first_name, age: m.age });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['family', userId] }),
  });
}

export type PendingKidsBooking = { ref: string; family_member_id: string; starts_at: string; title: string };

/** Kids bookings waiting for the instructor, shown as a warning row on the child's card (§7.14). */
export function usePendingKidsBookings(userId: string | undefined) {
  return useQuery({
    queryKey: ['pendingKids', userId],
    enabled: Boolean(userId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('ref, family_member_id, slot:slots(starts_at, offering:offerings(title))')
        .eq('status', 'pending')
        .not('family_member_id', 'is', null);
      if (error) throw error;
      type Row = {
        ref: string;
        family_member_id: string;
        slot: { starts_at: string; offering: { title: string } };
      };
      return (data as unknown as Row[]).map((r) => ({
        ref: r.ref,
        family_member_id: r.family_member_id,
        starts_at: r.slot.starts_at,
        title: r.slot.offering.title,
      })) as PendingKidsBooking[];
    },
  });
}
