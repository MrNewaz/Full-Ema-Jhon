import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
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
    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProducts);
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
          <button onClick={handleProceedCheckout} className='main-btn'>
            Proceed Checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;