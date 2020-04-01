import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import RegisterUser from "./components/register-user.component";
import LoginUser from "./components/login-user.component";
import Predict from "./components/predict.component";
import Users from "./components/users.component";
import QueryForm from "./components/query-user.component";
import Profile from "./components/profile-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={LoginUser} />
        <Route path="/register" component={RegisterUser} />
        <Route path="/login" component={LoginUser} />
        <Route path="/:type/:id/predict" component={Predict} />
        <Route path="/:type/:id/users" component={Users} />
        <Route path="/:type/:id/query" component={QueryForm} />
        <Route path="/:type/:id/profile" component={Profile} />
      </div>
    </Router>
  );
}

export default App;
