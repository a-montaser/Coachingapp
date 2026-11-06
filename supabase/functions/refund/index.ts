// refund (service role only, e.g. a scheduled call): sends queued refunds (from cancel_booking or a late
// payment) through the provider and records the outcome. Automatic, full refunds only (D29).
import { json, service } from '../_shared/supabase.ts';
import { getProvider } from '../_shared/payments/provider.ts';

Deno.serve(async (req) => {
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (req.headers.get('Authorization') !== `Bearer ${key}`) return json({ error: 'forbidden' }, 403);
  const db = service();
  const provider = getProvider();
  const { data: queued } = await db
    .from('refunds')
    .select('id, amount_egp, payment:payments(id, provider_ref, raw)')
    .eq('status', 'queued')
    .limit(50);
  let sent = 0;
  for (const r of (queued ?? []) as unknown as {
    id: string;
    amount_egp: number;
    payment: { id: string; provider_ref: string; raw: Record<string, unknown> | null };
  }[]) {
    try {
      const out = await provider.refund({
        providerRef: r.payment.provider_ref,
        transactionId: r.payment.raw?.id != null ? String(r.payment.raw.id) : null,
        amountEgp: r.amount_egp,
      });
      await db.from('refunds').update({ status: 'sent', provider_ref: out.providerRef }).eq('id', r.id);
      await db
        .from('payments')
        .update({ status: 'refunded', updated_at: new Date().toISOString() })
        .eq('id', r.payment.id);
      sent++;
    } catch (e) {
      await db
        .from('refunds')
        .update({ status: 'failed', error: (e as Error).message })
        .eq('id', r.id);
    }
  }
  return json({ sent, seen: queued?.length ?? 0 });
});
