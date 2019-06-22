import React from "react";
import { Router } from "@reach/router";
import { MessageProvider } from "./Context";
import Home from "./Pages/Home";
// import './css/debug.css';

require("dotenv").config();

export default function() {
  return (
    <MessageProvider>
      <Router>
          <Home path="/" />
      </Router>
    </MessageProvider>
  );
}
