import React from 'react';
import {Link} from 'react-router-dom';
import ButtonAddToCart from "./ButtonAddToCart";
import * as money from "../utils/financial";
import * as configs from "../configs/settings";

function Book({book}) {

  let buttonParams = {
    source : configs.settings.cart.addButton.sourceKeys.BOOK_KEY,
    bookId : book.id,
    quantity : 1
  };

  return(
    <div className="col-md-2" key={book.id}>
      <div className="card promoting-card">
        <div className="card-body d-flex flex-row">
          <h6 className="card-title font-weight-bold mb-2">{book.title}</h6>
        </div>
        <div className="view overlay">
          <Link className="text-danger" to={'/book/'+book.id}>
            <img className="card-img-top thumb-fit" src={book.imageUrl} alt=""/>
          </Link>
        </div>
        <div className="card-body">
          <div>
            <p className="card-text">
              <strong>ISBN: </strong> <Link className="text-danger" to={'/book/'+book.id}>{book.isbn}</Link><br/>
              <strong>Author: </strong> <span>{book.author}</span><br/>
              <span>
                <strong><em>{book.year}</em></strong>
                <span className="text-danger"> | </span>
                <em className="text-success">{book.language}</em>
              </span>
            </p>
            <h5 className="card-text">
              <span>{money.format(book.price)}</span>
              <span className="float-right">
                <ButtonAddToCart buttonParams={buttonParams} />
              </span>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
