// Fake provider: CI only (Maestro, R10). Every checkout succeeds at once; refunds succeed.
import type { PaymentProvider } from './provider.ts';

export const fake: PaymentProvider = {
  name: 'fake',
  settlesAtCheckout: true,
  createCheckout({ ref }) {
    return Promise.resolve({ url: `coachforall://payment-return?ref=${encodeURIComponent(ref)}` });
  },
  verifyWebhook() {
    return Promise.resolve(null);
  },
  refund({ providerRef }) {
    return Promise.resolve({ providerRef: `fake_refund_${providerRef}` });
  },
};
