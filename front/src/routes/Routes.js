import React from 'react';

import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';

import Login from "../pages/Login";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<Login />} />
      </Switch>
    </Router>
  );
}

export default Routes;