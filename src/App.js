import React from "react";
import { Router } from "@reach/router";
import { MessageProvider } from "./context";
import Home from "./pages/Home";
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
