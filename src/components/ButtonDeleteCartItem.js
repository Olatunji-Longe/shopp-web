import React, {useCallback, useContext, useState} from 'react';
import {ContextContainer} from "../App";
import swal from 'sweetalert';
import * as configs from "../configs/settings";

function ButtonDeleteCartItem({buttonParams}) {

  const { cartIdState, cartItemCountState, cartItemSubTotalState } = useContext(ContextContainer);

  const [cartId, setCartId] = cartIdState;
  const [cartItemCount, setCartItemCount] = cartItemCountState;
  const [cartSubTotal, setCartSubTotal] = cartItemSubTotalState;

  const [isSending, setIsSending] = useState(false);

  const sendDeleteItemFromCartRequest = useCallback(async () => {
    setIsSending(true);

    let requestBody = {
      "cartId": cartId,
      "bookId": buttonParams.bookId
    };

    fetch(configs.settings.remote.api.baseUrl + "/cart/book", {
      method: 'DELETE',
      body: JSON.stringify(requestBody),
      headers: configs.settings.remote.api.headers.jsonContent
    })
      .then(response => response.json())
      .then(data => {

        if(data.error){
          throw new Error(data.error);
        }

        if(data.cartItem && data.cartItem.checkoutState === configs.settings.cart.item.states.deleted){
          setCartSubTotal(data.subTotal);
          setCartItemCount(data.cartItemCount);

          buttonParams.updateCartItemVisibility();
        }else{
          throw new Error("Something went wrong while attempting to delete Book from Cart! ... please contact admin.");
        }
        setIsSending(false);
      }).catch((error) => {
        setIsSending(false);
        swal(configs.settings.errors.swal(error));
      });
  }, []);

  return (
    <button type="button" className="btn btn-danger" onClick={sendDeleteItemFromCartRequest}><i className="fa fa-trash"></i></button>
  );
}

export default ButtonDeleteCartItem;
