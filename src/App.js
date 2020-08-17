import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { MessageProvider, MessageContext } from "./Context";
import Wrapper from "./Components/Layouts/Wrapper";
import Home from "./pages/Home";
import ChatRoom from "./pages/ChatRoom";

// import './css/debug.css';

require("dotenv").config();

export default function () {
  return (
    <MessageProvider>
      <Wrapper>
        <Router>
          <Route exact={true} path="/" component={Home} />
          <ProtectedRoute path="/chat-room" component={ChatRoom} />
        </Router>
      </Wrapper>
    </MessageProvider>
  );
}

function ProtectedRoute({ children, ...rest }) {
  const context = useContext(MessageContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        context.state.user ? (
          children
        ) : (
          <Redirect to={{ pathname: "/", state: { from: location } }} />
        )
      }
    />
  );
}
