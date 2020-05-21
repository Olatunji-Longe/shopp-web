import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import * as money from "../utils/financial";
import * as configs from "../configs/settings";
import ButtonAddToCart from "./ButtonAddToCart";
import FieldUpdateItemQty from "./FieldUpdateItemQty";
import ButtonDeleteCartItem from "./ButtonDeleteCartItem";

function CartItem({bookCartItem}) {

  const [cartItem, setCartItem] = useState(bookCartItem);
  const [isBtnDisabled, setIsBtnDisabled] = useState(cartItem.quantity === 1);
  const [isVisible, setIsVisible] = useState(true);

  let onQuantityChanged = (cartItem, source) => {
    setCartItem(cartItem);
    setIsBtnDisabled(source === configs.settings.cart.addButton.sourceKeys.CART_MINUS_KEY && cartItem.quantity === 1);
  };

  let buttonParamsPlus = {
    source : configs.settings.cart.addButton.sourceKeys.CART_PLUS_KEY,
    bookId : cartItem.book.id,
    quantity : 1,
    updateInputValueAndButton: onQuantityChanged
  };

  let buttonParamsMinus = {
    source : configs.settings.cart.addButton.sourceKeys.CART_MINUS_KEY,
    bookId : cartItem.book.id,
    quantity : -1,
    updateInputValueAndButton: onQuantityChanged
  };

  let onCartItemDeleted = () => {
    setIsVisible(false);
  };

  let buttonParamsDelete = {
    bookId : cartItem.book.id,
    updateCartItemVisibility: onCartItemDeleted
  };

  if(!isVisible){
    return null;
  }

  return (
    <tr className="row">
      <td className="col-md-2">
        <Link to={'/book/'+cartItem.book.id}>
          <img className="cart-cover" src={cartItem.book.imageUrl} alt=""/>
        </Link>
      </td>
      <td className="col-md-5">
        <span>{cartItem.book.title}</span><br/>
        <Link to={'/book/'+cartItem.book.id}>
          <h6>{cartItem.book.isbn}</h6>
        </Link>
        <span>Author: </span><span><strong>{cartItem.book.author}</strong></span><br/>
        <div>
          <strong>{cartItem.book.year}</strong>
          <span className="text-danger"> | </span>
          <em className="text-success">{cartItem.book.language}</em>
        </div>
      </td>
      <td className="col-md-2 text-center">
        <div className="input-group">
          <span className="input-group-btn">
            <ButtonAddToCart buttonParams={buttonParamsMinus} isBtnDisabled={isBtnDisabled}/>
          </span>
          <FieldUpdateItemQty cartItem={cartItem} updateInputValueAndButton={onQuantityChanged} />
          <span className="input-group-btn">
            <ButtonAddToCart buttonParams={buttonParamsPlus} isBtnDisabled={false}/>
          </span>
        </div>
      </td>
      <td className="col-md-1 text-center">{money.format(cartItem.book.price)}</td>
      <td className="col-md-1 text-center">{money.format(cartItem.totalPrice)}</td>
      <td className="col-md-1">
        <ButtonDeleteCartItem buttonParams={buttonParamsDelete}/>
      </td>
    </tr>
  );
}

export default CartItem;
