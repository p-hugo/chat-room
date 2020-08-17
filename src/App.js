import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MessageProvider } from "./Context";
import Home from "./pages/Home";
// import './css/debug.css';

require("dotenv").config();

export default function () {
  return (
    <MessageProvider>
      <Router>
        <Route exact={true} path="/" component={Home} />
      </Router>
    </MessageProvider>
  );
}
