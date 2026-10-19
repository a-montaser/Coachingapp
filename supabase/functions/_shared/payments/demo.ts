// Demo provider (D29): an in-app checkout with Pay / Fail. The demo-pay Edge Function records the
// outcome through `record_payment`, the same path the real webhook uses. No money moves.
import type { PaymentProvider } from './provider.ts';

export const demo: PaymentProvider = {
  name: 'demo',
  settlesAtCheckout: false,
  createCheckout({ ref }) {
    return Promise.resolve({ url: `coachforall://demo-checkout?ref=${encodeURIComponent(ref)}` });
  },
  verifyWebhook() {
    // The demo has no gateway calling back; demo-pay is its "webhook".
    return Promise.resolve(null);
  },
  refund({ providerRef }) {
    return Promise.resolve({ providerRef: `demo_refund_${providerRef}` });
  },
};
