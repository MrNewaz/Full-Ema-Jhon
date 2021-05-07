import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './SimpleCardForm';
import SplitCardForm from './SplitCardForm';
import './style.css';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51Io4aoKKIDGCS8mMBx6ca06VwBQz3PJYFRcuaUM9dEG26iOetgfaLnLtf9bH2saYIBqH9iTZxLCscf8ltLtbpoYW00PPx9Kv1R'
);

const ProcessPayment = ({ handlePayment }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm handlePayment={handlePayment} />
    </Elements>
  );
};

export default ProcessPayment;
