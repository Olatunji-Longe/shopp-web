import React, {useContext, useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import CartItem from "./CartItem";
import * as configs from "../configs/settings";
import * as money from "../utils/financial";
import {ContextContainer} from "../App";

function Cart() {

  const { cartItemSubTotalState } = useContext(ContextContainer);
  const [cartSubTotal, setCartSubTotal] = cartItemSubTotalState;

  const {cartId} = useParams();
  const [cart, setCart] = useState({});


  useEffect(() => {
    fetch(configs.settings.remote.api.baseUrl + "/cart/" + cartId)
      .then(response => response.json())
      .then(data => {
        setCart(data.cart ? data.cart : {});
        setCartSubTotal(data.cart ? data.cart.subTotal : 0);
      });
  }, []);

  return (
    <div className="container" key={cart.id}>
      <div className="content">
        <div className="panel panel-default cart">
          <h3 className="panel-heading">Shopping Cart {cart.cartItems ? (<small className="text-success"><em>(verify your order)</em></small>) : ('')} </h3>
          <div className="panel-body">
            {cart.cartItems ?
              (
                <div>
                  <table className="table table-striped">
                    <thead>
                    <tr className="row">
                      <th className="col-md-2"></th>
                      <th className="col-md-5">Book</th>
                      <th className="col-md-2 text-center">Quantity</th>
                      <th className="col-md-1 text-center">Price</th>
                      <th className="col-md-1 text-center">Total</th>
                      <th className="col-md-1"></th>
                    </tr>
                    </thead>
                    <tbody>

                    {cart.cartItems.map((cartItem) => (
                      <CartItem bookCartItem={cartItem} key={cartItem.id}/>
                    ))}
                    <tr className="row">
                      <td className="col-md-2"></td>
                      <td className="col-md-5"></td>
                      <td className="col-md-2"></td>
                      <td className="col-md-1 text-right"><span>SubTotal: </span></td>
                      <td className="col-md-1 text-center"><h4>{money.format(cartSubTotal)}</h4></td>
                      <td className="col-md-1"></td>
                    </tr>
                    </tbody>
                  </table>
                  <p className="row">
                    <span className="ml-auto">
                  <Link to="/checkout" className="btn btn-success btn-lg">
                  Checkout <span className="fa fa-forward"></span>
                  </Link>
                  </span>
                  </p>
                </div>
              )
              :
              (
                <div className="text-danger text-center">
                  <hr/>
                  <h5> Your Shopping Cart is empty </h5>
                  <Link to="/books"> <button className="btn btn-lg btn-success">Add Books</button> </Link>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

//ReactDOM.render(<Cart />, document.querySelector('#books'));
