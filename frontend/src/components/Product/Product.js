import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import './Product.css';

const Product = (props) => {
  const { name, img, seller, price, stock } = props.product;

  return (
    <div className='product'>
      <div>
        <img src={img} alt={name} />
      </div>
      <div>
        <h4 className='product-name'>{name}</h4>
        <br />
        <p>by: {seller}</p>
        <p>${price}</p>

        <p>Only {stock} left in stock</p>
        <button
          onClick={() => props.handleAddProduct(props.product)}
          className='main-btn'
        >
          <FontAwesomeIcon icon={faCartPlus} /> Add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;
