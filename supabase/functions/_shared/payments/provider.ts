// The PaymentProvider contract (design.md §6). Edge Functions pick one with PAYMENT_PROVIDER;
// demo and fake are refused whenever APP_ENV=production (R7.3, design.md §9).
import { demo } from './demo.ts';
import { fake } from './fake.ts';
import { paymob } from './paymob.ts';

export type CheckoutInput = {
  /** Booking ref, shown to the learner (CFA-12345). */
  ref: string;
  /** Our unique id for this payment attempt; becomes payments.provider_ref. */
  paymentKey: string;
  amountEgp: number;
  phone: string;
  firstName: string;
  /** Where the hosted checkout sends the learner back (the app's deep link). */
  returnUrl: string;
  /** Our payment-webhook URL. */
  notificationUrl: string;
};

export type PaymentEvent = {
  /** payments.provider_ref of the attempt this event is about. */
  providerRef: string;
  status: 'paid' | 'failed';
  raw: unknown;
};

export interface PaymentProvider {
  name: 'demo' | 'paymob' | 'fake';
  /** Fake (CI) settles at checkout; the others wait for the learner. */
  settlesAtCheckout: boolean;
  createCheckout(input: CheckoutInput): Promise<{ url: string }>;
  /** Throws `bad_signature` when the request is not provably from the gateway. */
  verifyWebhook(req: Request): Promise<PaymentEvent | null>;
  refund(p: {
    providerRef: string;
    transactionId: string | null;
    amountEgp: number;
  }): Promise<{ providerRef: string }>;
}

const PROVIDERS = { demo, fake, paymob } as const;

export function getProvider(
  env: (key: string) => string | undefined = (k) => Deno.env.get(k),
): PaymentProvider {
  const name = (env('PAYMENT_PROVIDER') ?? 'demo') as keyof typeof PROVIDERS;
  const provider = PROVIDERS[name];
  if (!provider) throw new Error(`unknown_provider:${name}`);
  if (env('APP_ENV') === 'production' && name !== 'paymob') throw new Error('provider_refused_in_production');
  return provider;
}
