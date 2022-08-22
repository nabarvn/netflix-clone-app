import {
  createCheckoutSession,
  getStripePayments,
} from "@stripe/firestore-stripe-payments";
import { getFunctions, httpsCallable } from "@firebase/functions";
import app from "../firebase";

const payments = getStripePayments(app, {
  // "products" and "customers" are the names of respective collections that was
  // decided upon while installing the extension
  productsCollection: "products",
  customersCollection: "customers",
});

const loadCheckout = async (priceID: string) => {
  await createCheckoutSession(payments, {
    price: priceID,
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  })
    .then((snapshot) => window.location.assign(snapshot.url))
    .catch((err) => console.log(err.message));
};

const goToBillingPortal = async () => {
  const instance = getFunctions(app, "us-central1");
  const functionRef = httpsCallable(
    instance,
    "ext-firestore-stripe-payments-createPortalLink"
  );

  await functionRef({
    returnURL: `${window.location.origin}/account`,
  })
    .then(({ data }: any) => window.location.assign(data.url))
    .catch((err) => console.log(err.message));
};

export { loadCheckout, goToBillingPortal };
export default payments;
