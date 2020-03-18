import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import RegisterUser from "./components/register-user.component";
import LoginUser from "./components/login-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={LoginUser} />
        <Route path="/register" component={RegisterUser} />
        <Route path="/login" component={LoginUser} />
      </div>
    </Router>
  );
}

export default App;
