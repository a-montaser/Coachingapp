// create-checkout (signed-in learner): starts payment for one of their bookings that is awaiting
// payment (a live 5-minute card hold) or payment_due (kids, after confirmation). Records the attempt
// as `initiated` and returns the provider's checkout URL (design.md §6).
import { caller, json, service } from '../_shared/supabase.ts';
import { getProvider } from '../_shared/payments/provider.ts';

Deno.serve(async (req) => {
  if (req.method !== 'POST') return json({ error: 'method' }, 405);
  const user = await caller(req);
  if (!user) return json({ error: 'not_signed_in' }, 401);
  const { ref } = (await req.json().catch(() => ({}))) as { ref?: string };
  if (!ref) return json({ error: 'missing_ref' }, 400);

  const db = service();
  const { data: b } = await db
    .from('bookings')
    .select('id, ref, status, total_egp, hold_expires_at, pay_by')
    .eq('ref', ref)
    .eq('user_id', user.id)
    .maybeSingle();
  if (!b) return json({ error: 'not_found' }, 404);
  const now = Date.now();
  const live =
    (b.status === 'awaiting_payment' && b.hold_expires_at && Date.parse(b.hold_expires_at) > now) ||
    (b.status === 'payment_due' && b.pay_by && Date.parse(b.pay_by) > now);
  if (!live) return json({ error: 'not_payable' }, 409);

  const provider = getProvider();
  const paymentKey = `${provider.name}_${crypto.randomUUID()}`;
  const { error } = await db
    .from('payments')
    .insert({ booking_id: b.id, provider: provider.name, provider_ref: paymentKey, amount_egp: b.total_egp });
  if (error) return json({ error: 'payment_record' }, 500);

  const { url } = await provider.createCheckout({
    ref: b.ref,
    paymentKey,
    amountEgp: b.total_egp,
    phone: user.phone ? `+${user.phone.replace(/^\+/, '')}` : '',
    firstName: '',
    returnUrl: `coachforall://payment-return?ref=${encodeURIComponent(b.ref)}`,
    notificationUrl: `${Deno.env.get('SUPABASE_URL')}/functions/v1/payment-webhook`,
  });
  // The fake provider (CI) settles at once, through the same SQL path as a webhook.
  if (provider.settlesAtCheckout)
    await db.rpc('record_payment', { p_provider_ref: paymentKey, p_status: 'paid' });
  return json({ url, amountEgp: b.total_egp });
});
