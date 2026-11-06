// deno test supabase/functions — R7 AC: webhook HMAC good / tampered / replayed, the provider contract,
// and demo/fake refused in production.
import { assertEquals, assertRejects, assertThrows } from 'jsr:@std/assert@1.0.8';
import { hmacSha512, hmacString, verifyPaymob } from './paymob.ts';
import { getProvider } from './provider.ts';

// Paymob's worked sample (docs: HMAC Transaction Callback), as a Transaction Processed `obj`.
const sample = {
  amount_cents: 100000,
  created_at: '2024-06-13T11:33:44.592345',
  currency: 'EGP',
  error_occured: false,
  has_parent_transaction: false,
  id: 192036465,
  integration_id: 4097558,
  is_3d_secure: true,
  is_auth: false,
  is_capture: false,
  is_refunded: false,
  is_standalone_payment: true,
  is_voided: false,
  order: { id: 217503754, merchant_order_id: 'paymob_test-attempt' },
  owner: 302852,
  pending: false,
  source_data: { pan: '2346', sub_type: 'MasterCard', type: 'card' },
  success: true,
};
const DOC_STRING =
  '1000002024-06-13T11:33:44.592345EGPfalsefalse1920364654097558truefalsefalsefalsetruefalse217503754302852false2346MasterCardcardtrue';
const SECRET = 'test-hmac-secret';

const callback = async (obj: object, hmac?: string) =>
  new Request(
    `https://x.supabase.co/functions/v1/payment-webhook${hmac === undefined ? '' : `?hmac=${hmac}`}`,
    {
      method: 'POST',
      body: JSON.stringify({ type: 'TRANSACTION', obj }),
    },
  );

Deno.test("the signed string matches Paymob's documented sample, field for field", () => {
  assertEquals(hmacString(sample), DOC_STRING);
});

Deno.test('fields Paymob nests under obj.data are still found', () => {
  const { error_occured, owner, ...rest } = sample;
  assertEquals(hmacString({ ...rest, data: { error_occured, owner } }), DOC_STRING);
});

Deno.test('a correctly signed paid callback becomes a "paid" event for our payment attempt', async () => {
  const sig = await hmacSha512(DOC_STRING, SECRET);
  const event = await verifyPaymob(await callback(sample, sig), SECRET);
  assertEquals(event?.status, 'paid');
  assertEquals(event?.providerRef, 'paymob_test-attempt');
});

Deno.test('a tampered amount, a wrong secret or a missing signature is rejected', async () => {
  const sig = await hmacSha512(DOC_STRING, SECRET);
  await assertRejects(
    () => callback({ ...sample, amount_cents: 1 }, sig).then((r) => verifyPaymob(r, SECRET)),
    Error,
    'bad_signature',
  );
  await assertRejects(
    () => callback(sample, sig).then((r) => verifyPaymob(r, 'other-secret')),
    Error,
    'bad_signature',
  );
  await assertRejects(() => callback(sample).then((r) => verifyPaymob(r, SECRET)), Error, 'bad_signature');
});

Deno.test(
  'a replayed callback verifies again (record_payment makes the second delivery a no-op)',
  async () => {
    const sig = await hmacSha512(DOC_STRING, SECRET);
    const first = await verifyPaymob(await callback(sample, sig), SECRET);
    const again = await verifyPaymob(await callback(sample, sig), SECRET);
    assertEquals(again, first);
  },
);

Deno.test('a declined transaction is "failed"; a pending one waits for its final callback', async () => {
  const declined = { ...sample, success: false };
  const pending = { ...sample, pending: true };
  assertEquals(
    (await verifyPaymob(await callback(declined, await hmacSha512(hmacString(declined), SECRET)), SECRET))
      ?.status,
    'failed',
  );
  assertEquals(
    await verifyPaymob(await callback(pending, await hmacSha512(hmacString(pending), SECRET)), SECRET),
    null,
  );
});

Deno.test('provider choice: demo by default; demo and fake refused in production; paymob allowed', () => {
  const env = (vars: Record<string, string>) => (k: string) => vars[k];
  assertEquals(getProvider(env({})).name, 'demo');
  assertEquals(getProvider(env({ PAYMENT_PROVIDER: 'fake' })).name, 'fake');
  assertThrows(
    () => getProvider(env({ PAYMENT_PROVIDER: 'demo', APP_ENV: 'production' })),
    Error,
    'provider_refused_in_production',
  );
  assertThrows(
    () => getProvider(env({ PAYMENT_PROVIDER: 'fake', APP_ENV: 'production' })),
    Error,
    'provider_refused_in_production',
  );
  assertEquals(getProvider(env({ PAYMENT_PROVIDER: 'paymob', APP_ENV: 'production' })).name, 'paymob');
});

Deno.test('demo and fake checkouts: the in-app checkout link vs settle-at-once', async () => {
  const input = {
    ref: 'CFA-12345',
    paymentKey: 'k',
    amountEgp: 650,
    phone: '',
    firstName: '',
    returnUrl: '',
    notificationUrl: '',
  };
  const demo = getProvider(() => undefined);
  assertEquals((await demo.createCheckout(input)).url, 'coachforall://demo-checkout?ref=CFA-12345');
  assertEquals(demo.settlesAtCheckout, false);
  const fake = getProvider((k) => (k === 'PAYMENT_PROVIDER' ? 'fake' : undefined));
  assertEquals(fake.settlesAtCheckout, true);
});
