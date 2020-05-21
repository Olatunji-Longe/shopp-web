import React, {useCallback, useContext, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {ContextContainer} from "../App";
import swal from 'sweetalert';
import * as configs from "../configs/settings";

function ButtonAddToCart({buttonParams, isBtnDisabled}) {

  const { cartIdState, cartItemCountState, cartItemSubTotalState } = useContext(ContextContainer);

  const [cartId, setCartId] = cartIdState;
  const [cartItemCount, setCartItemCount] = cartItemCountState;
  const [cartSubTotal, setCartSubTotal] = cartItemSubTotalState;

  const [isSending, setIsSending] = useState(false);
  const [cartItem, setCartItem] = useState({});

  const history = useHistory();
  const { location } = useLocation();

  const sourceKeys = {
    BOOK_KEY : configs.settings.cart.addButton.sourceKeys.BOOK_KEY,
    BOOK_DETAIL_KEY: configs.settings.cart.addButton.sourceKeys.BOOK_DETAIL_KEY,
    CART_PLUS_KEY: configs.settings.cart.addButton.sourceKeys.CART_PLUS_KEY,
    CART_MINUS_KEY: configs.settings.cart.addButton.sourceKeys.CART_MINUS_KEY
  };

  const sendAddItemToCartRequest = useCallback(async () => {
    setIsSending(true);

    let requestBody = {
      "cartId": cartId,
      "bookId": buttonParams.bookId,
      "quantity": buttonParams.quantity
    };

    fetch(configs.settings.remote.api.baseUrl + "/cart/book/quantity/update", {
      method: 'PUT',
      body: JSON.stringify(requestBody),
      headers: configs.settings.remote.api.headers.jsonContent
    })
      .then(response => response.json())
      .then(data => {

        if(data.error){
          throw new Error(data.error);
        }

        if(data.cartItem && data.cartItem.checkoutState === configs.settings.cart.item.states.queued){
          setCartItem(data.cartItem);
          if(buttonParams.source === sourceKeys.BOOK_KEY || buttonParams.source === sourceKeys.BOOK_DETAIL_KEY){
            setCartItemCount(data.cartItemCount);
            showSuccessAlert();
          }else if(buttonParams.source === sourceKeys.CART_PLUS_KEY || buttonParams.source === sourceKeys.CART_MINUS_KEY){
            setCartSubTotal(data.subTotal);
            setCartItem(data.cartItem);

            buttonParams.updateInputValueAndButton(data.cartItem, buttonParams.source);
          }
        }else{
          history.push(location);
        }
        setIsSending(false);
      }).catch((error) => {
        setIsSending(false);
        swal(configs.settings.errors.swal(error));
      });
  }, []);

  let showSuccessAlert = () => {
    swal({
      title: "Success",
      text: "Book has been added to cart",
      icon: "success",
      buttons: {
        shop: {
          text: "Continue Shopping",
          value: "shop",
        },
        cart: {
          text: "Go to Cart",
          value: "cart",
        }
      }
    }).then((value) => {
      switch (value) {

        case "shop":
          history.push(location);
          break;

        case "cart":
          history.push('/cart/'+cartId);
          break;

        default:
      }
    });
  };

  let getButton = () => {
    if(buttonParams.source === sourceKeys.BOOK_KEY || buttonParams.source === sourceKeys.BOOK_DETAIL_KEY){
      return <button disabled={isSending} className="btn btn-flat btn-success" onClick={sendAddItemToCartRequest}>Add To Cart</button>
    }else if(buttonParams.source === sourceKeys.CART_PLUS_KEY){
      return <button disabled={isSending} type="button" className="btn btn-default btn-number" onClick={sendAddItemToCartRequest}><i className="fa fa-plus"></i></button>
    }else if(buttonParams.source === sourceKeys.CART_MINUS_KEY){
      return <button disabled={isSending || isBtnDisabled} type="button" className="btn btn-default btn-number" onClick={sendAddItemToCartRequest}><i className="fa fa-minus"></i></button>
    }
    return "";
  };

  if (!cartItem) { return null;}

  return (
    getButton()
  );
}

export default ButtonAddToCart;
