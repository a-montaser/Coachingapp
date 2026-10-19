// payment-webhook (public, signature-verified): the gateway's Transaction Processed callback.
// Idempotent: `record_payment` ignores an attempt that is no longer `initiated`, so replays are harmless.
import { json, service } from '../_shared/supabase.ts';
import { getProvider } from '../_shared/payments/provider.ts';

Deno.serve(async (req) => {
  if (req.method !== 'POST') return json({ error: 'method' }, 405);
  let event;
  try {
    event = await getProvider().verifyWebhook(req);
  } catch (e) {
    return json({ error: (e as Error).message }, 401);
  }
  if (!event) return json({ ok: true }); // pending, or a provider without callbacks
  const { error } = await service().rpc('record_payment', {
    p_provider_ref: event.providerRef,
    p_status: event.status,
    p_raw: event.raw,
  });
  // Unknown references are acknowledged so the gateway stops retrying; everything else must be retried.
  if (error && !error.message.includes('not_found')) return json({ error: 'record_failed' }, 500);
  return json({ ok: true });
});
