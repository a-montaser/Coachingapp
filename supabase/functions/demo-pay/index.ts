// demo-pay (signed-in learner, demo provider only): the demo checkout's Pay / Fail. Records the
// outcome of the booking's latest initiated attempt through `record_payment`, like the webhook.
import { caller, json, service } from '../_shared/supabase.ts';
import { getProvider } from '../_shared/payments/provider.ts';

Deno.serve(async (req) => {
  if (req.method !== 'POST') return json({ error: 'method' }, 405);
  if (getProvider().name !== 'demo') return json({ error: 'demo_only' }, 403);
  const user = await caller(req);
  if (!user) return json({ error: 'not_signed_in' }, 401);
  const { ref, outcome } = (await req.json().catch(() => ({}))) as { ref?: string; outcome?: string };
  if (!ref || (outcome !== 'paid' && outcome !== 'failed')) return json({ error: 'bad_request' }, 400);

  const db = service();
  const { data: b } = await db
    .from('bookings')
    .select('id')
    .eq('ref', ref)
    .eq('user_id', user.id)
    .maybeSingle();
  if (!b) return json({ error: 'not_found' }, 404);
  const { data: pay } = await db
    .from('payments')
    .select('provider_ref')
    .eq('booking_id', b.id)
    .eq('status', 'initiated')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!pay) return json({ error: 'no_payment' }, 409);
  const { data, error } = await db.rpc('record_payment', {
    p_provider_ref: pay.provider_ref,
    p_status: outcome,
    p_raw: { demo: true, outcome },
  });
  if (error) return json({ error: 'record_failed' }, 500);
  return json({ status: (data as { status: string }).status });
});
