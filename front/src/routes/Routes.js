import React from 'react';

import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';

import Login from "../pages/Login";
import Users from "../pages/Users";
import Register from "../pages/Register";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Users />} />
        <Route path="/register" element={<Register />} />
      </Switch>
    </Router>
  );
}

export default Routes;