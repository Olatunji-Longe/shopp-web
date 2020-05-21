import React, {useEffect, useState} from 'react';
import Book from "./Book";
import * as configs from "../configs/settings";

function Books() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(configs.settings.remote.api.baseUrl+"/books")
      .then(response => response.json())
      .then(data => setBooks(data.books));
  }, []);

  if(!books){return null;}
  return (
    <div className="content">
      <div className="row">
        {books.map((book) => (
          <Book book={book} key={book.id} />
        ))}
      </div>
    </div>
  );
}

export default Books;
