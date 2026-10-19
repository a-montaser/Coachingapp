// Paymob (Egypt), switched on by secrets + PAYMENT_PROVIDER=paymob (D29). Sandbox keys only until the
// owner approves live payments.
// Verified against Paymob's docs (Oct 2026): Intention API at accept.paymob.com/v1/intention/ with
// "Authorization: Token <secret key>", Unified Checkout at /unifiedcheckout/?publicKey=&clientSecret=,
// and the Transaction Processed HMAC (SHA-512 over 20 fields, `hmac` query parameter).
// shortcut: the refund endpoint (void_refund/refund) is Paymob's long-standing one, not re-verified;
// confirm it with the first sandbox refund when the merchant account exists.
import type { PaymentEvent, PaymentProvider } from './provider.ts';

const BASE = 'https://accept.paymob.com';
const env = (k: string) => {
  const v = Deno.env.get(k);
  if (!v) throw new Error(`missing_secret:${k}`);
  return v;
};

/** Paymob's Transaction Processed callback fields, in HMAC order (docs: HMAC Transaction Callback). */
export const HMAC_FIELDS = [
  'amount_cents',
  'created_at',
  'currency',
  'error_occured',
  'has_parent_transaction',
  'id',
  'integration_id',
  'is_3d_secure',
  'is_auth',
  'is_capture',
  'is_refunded',
  'is_standalone_payment',
  'is_voided',
  'order.id',
  'owner',
  'pending',
  'source_data.pan',
  'source_data.sub_type',
  'source_data.type',
  'success',
] as const;

type Obj = Record<string, unknown>;
const at = (o: Obj, path: string): unknown =>
  path.split('.').reduce<unknown>((v, k) => (v as Obj | undefined)?.[k], o);

/** The string Paymob signs: each field's value in order; booleans as "true"/"false", missing as "". */
export function hmacString(obj: Obj): string {
  return HMAC_FIELDS.map((f) => {
    // The sample payload repeats some fields under obj.data (error_occured, owner): fall back to it.
    const v = at(obj, f) ?? at(obj, `data.${f}`);
    return v === undefined || v === null ? '' : String(v);
  }).join('');
}

export async function hmacSha512(message: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-512' },
    false,
    ['sign'],
  );
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message)));
  return Array.from(sig, (b) => b.toString(16).padStart(2, '0')).join('');
}

/** Constant-time comparison, so the signature can't be guessed byte by byte. */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Verifies a Transaction Processed callback and turns it into our event. Pending transactions → null. */
export async function verifyPaymob(req: Request, secret: string): Promise<PaymentEvent | null> {
  const received = new URL(req.url).searchParams.get('hmac') ?? '';
  const body = (await req.json()) as { obj?: Obj };
  const obj = body.obj ?? {};
  const expected = await hmacSha512(hmacString(obj), secret);
  if (!received || !safeEqual(expected, received.toLowerCase())) throw new Error('bad_signature');
  if (obj.pending === true) return null; // final outcome arrives in a later callback
  const providerRef = String(
    at(obj, 'order.merchant_order_id') ?? at(obj, 'payment_key_claims.extra.payment_key') ?? '',
  );
  if (!providerRef) throw new Error('missing_reference');
  return { providerRef, status: obj.success === true ? 'paid' : 'failed', raw: obj };
}

export const paymob: PaymentProvider = {
  name: 'paymob',
  settlesAtCheckout: false,
  async createCheckout(b) {
    const res = await fetch(`${BASE}/v1/intention/`, {
      method: 'POST',
      headers: { Authorization: `Token ${env('PAYMOB_SECRET_KEY')}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: b.amountEgp * 100,
        currency: 'EGP',
        payment_methods: env('PAYMOB_INTEGRATION_IDS')
          .split(',')
          .map((s) => Number(s.trim())),
        items: [{ name: `Booking ${b.ref}`, amount: b.amountEgp * 100, quantity: 1 }],
        billing_data: {
          first_name: b.firstName || 'Learner',
          last_name: 'Coach For All',
          phone_number: b.phone,
          email: 'na@coachforall.app',
          country: 'EG',
          city: 'Cairo',
          street: 'NA',
          building: 'NA',
          floor: 'NA',
          apartment: 'NA',
        },
        special_reference: b.paymentKey,
        extras: { payment_key: b.paymentKey, ref: b.ref },
        notification_url: b.notificationUrl,
        redirection_url: b.returnUrl,
      }),
    });
    if (!res.ok) throw new Error(`paymob_intention_${res.status}`);
    const data = (await res.json()) as { client_secret: string };
    return {
      url: `${BASE}/unifiedcheckout/?publicKey=${encodeURIComponent(env('PAYMOB_PUBLIC_KEY'))}&clientSecret=${encodeURIComponent(data.client_secret)}`,
    };
  },
  verifyWebhook(req) {
    return verifyPaymob(req, env('PAYMOB_HMAC_SECRET'));
  },
  async refund({ transactionId, amountEgp }) {
    if (!transactionId) throw new Error('missing_transaction_id');
    const res = await fetch(`${BASE}/api/acceptance/void_refund/refund`, {
      method: 'POST',
      headers: { Authorization: `Token ${env('PAYMOB_SECRET_KEY')}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ transaction_id: transactionId, amount_cents: amountEgp * 100 }),
    });
    if (!res.ok) throw new Error(`paymob_refund_${res.status}`);
    const data = (await res.json()) as { id?: number | string };
    return { providerRef: String(data.id ?? transactionId) };
  },
};
