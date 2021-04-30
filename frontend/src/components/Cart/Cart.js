import React from 'react';

const Cart = (props) => {
  const cart = props.cart;
  const totalPrice = cart.reduce(
    (total, prd) => total + prd.price * prd.quantity,
    0
  );

  let shipping = 0;
  if (totalPrice > 35) {
    shipping = 0;
  } else if (totalPrice > 15) {
    shipping = 4.99;
  } else if (totalPrice > 0) {
    shipping = 12.99;
  }

  const tax = totalPrice * 0.14;

  const numFix = (num) => {
    const fix = num.toFixed(2);
    return Number(fix);
  };

  return (
    <div>
      <h3>Order Summary</h3>
      <p>Items ordered : {cart.length}</p>
      <p>Product price : {numFix(totalPrice)}</p>
      <p>
        <small>Shipping cost: {numFix(shipping)}</small>
      </p>
      <p>
        <small>Tax: {numFix(tax)}</small>
      </p>
      <p>Total price : {numFix(totalPrice + shipping + tax)}</p>
      {props.children}
    </div>
  );
};

export default Cart;
