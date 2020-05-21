import React, {useContext, useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import './css/styles.css';
import Home from "./components/Home";
import Books from './components/Books';
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import BookDetail from "./components/BookDetail";
import OrderConfirmation from "./components/OrderConfirmation";

const ContextContainer = React.createContext(null);

function App() {

  const [cartId, setCartId] = React.useState(1);
  const [cartItemCount, setCartItemCount] = React.useState(null);
  const [cartSubTotal, setCartSubTotal] = React.useState(null);

  const globalStates = {
    cartIdState:[cartId, setCartId],
    cartItemCountState: [cartItemCount, setCartItemCount],
    cartItemSubTotalState: [cartSubTotal, setCartSubTotal]
  };

  return (
    <ContextContainer.Provider value={globalStates}>
    <Router>
      <main>
        <div className="">
            <NavBar />
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/books" component={Books} />
          <Route path="/book/:bookId" component={BookDetail} />
          <Route path="/cart/:cartId" component={Cart}/>
          <Route path="/checkout" component={OrderConfirmation}/>
        </Switch>
      </main>
    </Router>
    </ContextContainer.Provider>
  );

}
export { ContextContainer };
export default App;
