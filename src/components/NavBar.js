import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import * as configs from "../configs/settings";
import {ContextContainer} from "../App";

function NavBar() {

  const { cartIdState, cartItemCountState } = useContext(ContextContainer);
  const [cartId, setCartId] = cartIdState;
  const [cartItemCount, setCartItemCount] = cartItemCountState;

  const [bookCount, setBookCount] = useState([]);

  useEffect(() => {
    fetch(configs.settings.remote.api.baseUrl+"/nav/cart/"+cartId)
      .then(response => response.json())
      .then(data => {
        setBookCount(data.bookCount);
        setCartItemCount(data.cartItemCount);
      });
  }, []);

  if(!cartItemCount){return null;}
  return(
    <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">Shopp</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              <i className="fa fa-home"></i>
              Home
              <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/books">
              <i className="fa fa-book">
                <span className="badge badge-danger">{bookCount}</span>
              </i>
              Books
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ">
          <li className="nav-item">
            <Link className="nav-link" to={'/cart/'+cartId}>
              <i className="fa fa-shopping-cart">
                <span className="badge badge-success">{cartItemCount}</span>
              </i>
              Cart
            </Link>
          </li>
        </ul>
        {/*<form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>*/}
      </div>
    </nav>
  );
}

export default NavBar;
