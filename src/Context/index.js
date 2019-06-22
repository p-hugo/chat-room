import React, { Component } from "react";
import io from "socket.io-client";
// Step 1: Create the context
const MessageContext = React.createContext();

// Step 2: Create a provider
class MessageProvider extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: "",
      id: null,
      typing: null,
      connected: []
    };
  }

  componentDidMount() {
    // Before tab closes signal server
    window.addEventListener("beforeunload", ev => {
      ev.preventDefault();
      this.socket.emit("end", { id: this.state.id, user: this.state.user });
    });
  }

  addMessage = message => {
    this.socket.emit("chat", {
      message,
      sender: this.state.user
    });
  };

  // This is when the user succesfully enter his/her name for the first time
  setName = user => {
    this.setState({ user });
    // socket is created
    this.socket = io(process.env.REACT_APP_URL);

    // listen for the initial emitted message from server, this brings
    // the current set of people connected and an id to be assigned for
    // reference
    this.socket.on("initial", ({ id, connected }) => {
      this.setState({ id, connected });
    });

    // let others know you have joined!
    this.socket.emit("connected", user);

    //Subscribe to chat events
    this.socket.on("chat", data => {
      this.setState({
        messages: [
          ...this.state.messages,
          { sender: data.sender, content: data.message }
        ]
      });
    });

    // Subscribe to typing events
    this.socket.on("typing", user => {
      //set feedback to true and display name
      this.setState({
        typing: user
      });
    });

    //subscribe to people present in the chat
    this.socket.on("connected", user => {
      this.setState(prevState => ({
        connected: [...prevState.connected, user]
      }));
    });

    //subscribe to people leaving
    this.socket.on("end", user => {
      const { connected } = this.state;
      let update_connected = connected.filter(val => val !== user);
      this.setState({
        connected: update_connected
      });
    });
  };

  incomingMessage = message => {
    this.setState(prevState => ({
      messages: [prevState.messages, message]
    }));
  };

  typing = () => {
    this.socket.emit("typing", this.state.user);
  };

  render() {
    return (
      <MessageContext.Provider
        value={{
          state: this.state,
          addMessage: this.addMessage,
          setName: this.setName,
          incomingMessage: this.incomingMessage,
          typing: this.typing
        }}
      >
        {this.props.children}
      </MessageContext.Provider>
    );
  }
}

// Step 3: User <MessageContext.Consumer> {(value) => {...} }
export { MessageContext, MessageProvider };
