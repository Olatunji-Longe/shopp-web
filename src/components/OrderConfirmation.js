import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import * as configs from "../configs/settings";
import * as money from "../utils/financial";
import * as timeFormatter from "../utils/timeformats";
import {ContextContainer} from "../App";

function OrderConfirmation() {

  const { cartIdState, cartItemCountState, cartItemSubTotalState } = useContext(ContextContainer);

  const [cartId, setCartId] = cartIdState;
  const [cartItemCount, setCartItemCount] = cartItemCountState;
  const [order, setOrder] = useState([]);

  let requestBody = {
    "cartId": cartId
  };

  useEffect(() => {
    fetch(configs.settings.remote.api.baseUrl + "/cart/checkout", {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: configs.settings.remote.api.headers.jsonContent
    })
      .then(response => response.json())
      .then(data => {
        console.log("data: " + JSON.stringify(data));
        setOrder(data.order)});
  }, []);

  if(!order || order.length < 1){return null;}else{
    setCartItemCount(0);
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex justify-content-center row">
        <div className="col-md-10">
          <div className="receipt bg-white p-3 rounded">
            <h4 className="mt-2 mb-3">Your order is confirmed! <i className="fa fa-check-circle text-success" width="40" height="40"></i></h4>
            <h6 className="name">Hello {order.createdBy},</h6>
            <span className="fs-12 text-black-50">Your order has been confirmed and you will receive a shipping confirmation email once the item(s) have been shipped!</span>
            <hr/>
            <div className="d-flex flex-row justify-content-between align-items-center order-details">
              <div><span className="d-block fs-12">Order date</span><span className="font-weight-bold">{timeFormatter.toDate(order.createdAtMillis)}</span></div>
              <div><span className="d-block fs-12">Order number</span><span className="font-weight-bold">{order.reference}</span></div>
              <div><span className="d-block fs-12">Payment method</span><span className="font-weight-bold">Credit card</span>
                <img className="ml-1 mb-1" src="https://i.imgur.com/ZZr3Yqj.png" width="20"/>
              </div>
              <div><span className="d-block fs-12">Shipping Address</span><span className="font-weight-bold text-success">{order.destinationAddress.country} ({order.destinationAddress.zipCode})</span></div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-md-6">
                {order.cartItems.map((cartItem) => (
                  <div key={cartItem.id}>
                    <div className="d-flex justify-content-between align-items-center product-details">
                      <Link to={'/book/'+cartItem.book.id}>
                        <div className="d-flex flex-row product-name-image">
                          <img className="rounded-circle" src={cartItem.book.imageUrl}  width="60" height="60"/>
                          <div className="d-flex flex-column justify-content-between ml-2">
                            <strong className="font-weight-bold text-body">{cartItem.book.title}</strong>
                            <small className="text-secondary">
                              ISBN: <strong><em>{cartItem.book.isbn}</em></strong> <span className="badge badge-danger">{cartItem.book.year}</span>
                              <br/>
                              Price: <strong className="text-success">{money.format(cartItem.book.price)} (x{cartItem.quantity})</strong>
                            </small>
                          </div>
                        </div>
                      </Link>
                      <div className="product-price">
                        <h5>{money.format(cartItem.totalPrice)}</h5>
                      </div>
                    </div>
                    <hr/>
                  </div>
                ))}
              </div>
              <div className="col-md-6">
                <div className="billing">
                  <div className="d-flex justify-content-between">
                    <span><strong>SUBTOTAL</strong></span>
                    <span className="font-weight-bold">{money.format(order.totalAmount)}</span>
                  </div>
                  <hr/>
                  {order.fees.map((fee) => (
                    <div className="d-flex justify-content-between mt-2" key={fee.id}>
                      <span>{fee.feeType}: </span>
                      <span className="font-weight-bold">{money.format(fee.amount)}</span>
                    </div>
                  ))}
                  <hr/>
                  <h4 className="d-flex justify-content-between mt-1">
                    <span className="font-weight-bold">Total</span>
                    <span className="font-weight-bold text-success">{money.format(order.netTotal)}</span>
                  </h4>
                </div>
              </div>
            </div>
            <hr/>
            <div className="d-flex justify-content-between align-items-center footer">
              <div className="thanks">
                <span className="d-block font-weight-bold">Thanks for shopping</span>
                <span>Shopp team</span>
              </div>
              <div className="d-flex flex-column justify-content-end align-items-end">
                <span className="d-block font-weight-bold">Need Help?</span
                ><span>Call - 123456789</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
