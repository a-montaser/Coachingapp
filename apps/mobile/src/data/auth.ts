import type { Session } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { supabase } from './supabase';

/** §7.2: 10 digits after the fixed +20 (e.g. 100 234 5678). */
export const isValidEgMobile = (digits: string) => /^\d{10}$/.test(digits);

/** "1002345678" → "100 234 5678" while typing. */
export function formatEgMobile(digits: string) {
  const d = digits.replace(/\D/g, '').slice(0, 10);
  return [d.slice(0, 3), d.slice(3, 6), d.slice(6)].filter(Boolean).join(' ');
}

const e164 = (digits: string) => `+20${digits}`;

export const sendCode = (digits: string) => supabase.auth.signInWithOtp({ phone: e164(digits) });
export const verifyCode = (digits: string, token: string) =>
  supabase.auth.verifyOtp({ phone: e164(digits), token, type: 'sms' });
export const signOut = () => supabase.auth.signOut();

/** The current session; `loading` until the stored one has been read. */
export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, []);
  return { session, loading };
}

export type Profile = {
  id: string;
  first_name: string | null;
  area_id: string | null;
  who_for: 'me' | 'child' | 'both' | null;
  instructor_pref: 'none' | 'female' | 'male';
  onboarded_at: string | null;
  created_at: string;
};

export function useProfile(userId: string | undefined) {
  return useQuery({
    queryKey: ['profile', userId],
    enabled: Boolean(userId),
    queryFn: async () => {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId!).single();
      if (error) throw error;
      return data as Profile;
    },
  });
}

/** Supabase auth errors → our copy keys. */
export function authErrorKey(error: { message?: string; code?: string; status?: number } | null) {
  if (!error) return null;
  const m = `${error.code ?? ''} ${error.message ?? ''}`.toLowerCase();
  if (m.includes('expired') || m.includes('invalid') || m.includes('otp')) return 'auth.wrongCode';
  if (error.status === 429 || m.includes('rate')) return 'auth.tooMany';
  return 'auth.genericError';
}
