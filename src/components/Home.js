import React from 'react';
import {Link} from "react-router-dom";

function Home() {

  return (
    <div className="container">
      <div className="content">
        <div className="row ">
          <div className="col-md-12">
            <div className="text-center landing">
              <h1 className="font-xxl">Welcome ... </h1>
              <p className="">Click the <Link className="text-danger" to="/books">Books</Link> menu on the top right corner of the nav bar to get started!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

