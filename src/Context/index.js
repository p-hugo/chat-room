import React, { useEffect } from "react";
import io from "socket.io-client";
import useChatReducer from "./useChatReducer";

// Step 1: Create the context
let MessageContext;
const { Provider } = (MessageContext = React.createContext());

// Set the socket connection
const socket = io(process.env.REACT_APP_URL);

function MessageProvider({ children }) {
  const {
    state,
    newMessage,
    setTyping,
    initialConnect,
    newConnection,
    removeConnection,
  } = useChatReducer(socket);
  // Effect for when the user leaves the chat
  useEffect(() => {
    function offlineHandler(ev) {
      ev.preventDefault();
      socket.emit("end", { id: state.id, user: state.user });
    }

    window.addEventListener("beforeunload", offlineHandler);
    return () => {
      window.removeEventListener("beforeunload", offlineHandler);
    };
  });

  // Chat Subscriptions
  useEffect(() => {
    // Initial load of people connected
    socket.on("initial", initialConnect);

    //Subscribe to chat events
    socket.on("chat", newMessage);

    // Subscribe to typing events
    socket.on("typing", setTyping);

    // Subscribe to people present in the chat
    socket.on("connected", newConnection);

    // Subscribe to people leaving
    socket.on("end", removeConnection);
  }, []);

  return (
    <Provider value={{ ...state, isTyping, sendMessage }}>{children}</Provider>
  );

  function isTyping() {
    socket.emit("typing", state.user);
  }

  function sendMessage(message) {
    socket.emit("chat", {
      message,
      sender: state.user,
    });
  }
}

// Step 3: User <MessageContext.Consumer> {(value) => {...} }
export { MessageContext, MessageProvider };
