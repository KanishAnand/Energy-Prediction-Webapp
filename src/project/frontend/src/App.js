import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/users-list.component'
import CreateUser from './components/create-user.component'
import LoginUser from './components/login-user.component'
import VendorUser from './components/vendor-user.component'
import OwnerUser from './components/owner-user.component'
import AddProduct from './components/add-product.component'
import ProductsList from './components/product-list.component'
import SearchProduct from './components/search-product.component'

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Register</Link>
              </li>
              <li className="navbar-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
            </ul>
          </div>
        </nav>

        <br/>
        <Route path="/list" exact component={UsersList}/>
        <Route path="/" exact component={CreateUser}/>
        <Route path="/login" component={LoginUser}/>
        <Route path="/vendor/:id" component={VendorUser}/>
        <Route path="/customer/:id" component={OwnerUser}/>
        <Route path="/addproduct/:id" component={AddProduct}/>
        <Route path="/listproducts/:id" component={ProductsList}/>
        <Route path="/searchproduct/:id" component={SearchProduct}/>

      </div>
    </Router>
  );
}

export default App;
