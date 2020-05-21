import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import ButtonAddToCart from "./ButtonAddToCart";
import * as configs from "../configs/settings";
import * as money from "../utils/financial";
import swal from "sweetalert";

function BookDetail() {

  const {bookId} = useParams();
  const [book, setBook] = useState([]);

  useEffect(() => {
    fetch(configs.settings.remote.api.baseUrl + "/books/" + bookId)
      .then(response => response.json())
      .then(data => {
        if(data.error){
          throw new Error(data.error);
        }

        setBook(data.book);

      }).catch((error) => {
        swal(configs.settings.errors.swal(error));
      });
  }, []);

  if (!book) {
    return null;
  }

  let buttonParams = {
    source : configs.settings.cart.addButton.sourceKeys.BOOK_DETAIL_KEY,
    bookId : bookId,
    quantity : 1
  };

  return (
    <div className="container key={book.id}">
      <div className="content">
        <div className="col-md-6">
          <div className="card promoting-card">
            <div className="card-body d-flex flex-row">
              <h6 className="card-title font-weight-bold mb-2">{book.title}</h6>
            </div>
            <div className="view overlay">
              <img className="card-img-top thumb-fit" src={book.imageUrl} alt=""/>
            </div>
            <div className="card-body">
              <div>
                <p className="card-text">
                  <strong>ISBN: </strong> <span className="text-danger">{book.isbn}</span><br/>
                  <strong>Author: </strong> <span>{book.author}</span><br/>
                  <span>
                    <strong><em>{book.year}</em></strong>
                    <span className="text-danger"> | </span>
                    <em className="text-success">{book.language}</em>
                  </span>
                </p>
                <h3 className="card-text">
                  <span>{money.format(book.price)}</span>
                  <span className="float-right">
                    <ButtonAddToCart buttonParams={buttonParams} />
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
