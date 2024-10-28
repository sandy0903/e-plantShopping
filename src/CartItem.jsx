import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    const total=cart.reduce((intitialValue,costOfItem)=>{
      const cost=Number(costOfItem.cost.replace(/[^a-zA-Z0-9 ]/g, ""));
      return intitialValue+=cost*costOfItem.quantity
    },0)
    return total
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e)
  };



  const handleIncrement = (item) => {
    const incrementItem={...item}
    incrementItem.quantity+=1
    console.log("incrementItem",incrementItem)
    dispatch(updateQuantity(incrementItem))
  };

  const handleDecrement = (item) => {
    const decrementItem={...item}
    decrementItem.quantity-=1
    if(decrementItem.quantity<0){
      decrementItem.quantity=0
    }
    dispatch(updateQuantity(decrementItem))
  };

  const handleRemove = (item) => {
    console.log("removed")
    dispatch(removeItem(item))
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const cost=Number(item.cost.replace(/[^a-zA-Z0-9 ]/g, ""));
    return item.quantity*cost
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


