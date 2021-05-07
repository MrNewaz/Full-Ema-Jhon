import React, { useEffect, useState } from 'react';

import {
  getDatabaseCart,
  removeFromDatabaseCart,
  processOrder,
} from '../../utilities/databaseManager';

import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {
  document.title = 'Review';
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const history = useHistory();

  const handleProceedCheckout = () => {
    history.push('/shipment');
  };

  const removeProduct = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };

  useEffect(() => {
    //Cart
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);

    fetch('http://localhost:5000/productByKeys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
      });
  }, []);

  let thankyou;
  if (orderPlaced) {
    thankyou = <img src={happyImage} />;
  }

  return (
    <div className='twin-container'>
      <div className='product-container'>
        {cart.map((pd) => (
          <ReviewItem key={pd.key} product={pd} removeProduct={removeProduct} />
        ))}
        {thankyou}
      </div>

      <div className='cart-container'>
        <Cart cart={cart}>
          <button onClick={handleProceedCheckout}>Proceed Checkout</button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
