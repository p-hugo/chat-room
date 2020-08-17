import React, { Component } from "react";
import io from "socket.io-client";
import "bulma/css/bulma.css";
import "./css/custom.css";
// import Messages from "./Components/Messages";
require("dotenv").config();

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      feedback: false,
      inputValue: "",
      user: "",
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  /**
   * All the networking stuff happens here
   */
  componentDidMount() {
    // connect -> triggers 'connection' event on the server
    this.socket = io(process.env.REACT_APP_URL);

    // Listen for events coming from the server, emitted by other users(including self)
    this.socket.on("chat", (data) => {
      //update message array, set feedback to false
      this.setState({
        messages: [
          ...this.state.messages,
          { user: data.sender, message: data.message },
        ],
        feedback: false,
      });
    });

    // When someone types
    this.socket.on("typing", (user) => {
      //set feedback to true and display name
      this.setState({
        feedback: {
          ready: true,
          user,
        },
      });
    });
  }

  /**
   * Typing emitter happens here
   * @param evt
   */
  updateInputValue(evt) {
    //todo: emitt change
    this.socket.emit("typing", this.state.user);
    this.setState({
      inputValue: evt.target.value,
    });
  }

  updateUser(evt) {
    this.setState({
      user: evt.target.value,
    });
  }

  handleEnter(event) {
    if (event.key === "Enter") {
      //todo: emit change
      let { inputValue, user } = this.state;
      this.socket.emit("chat", {
        message: inputValue,
        sender: user,
      });
      this.setState({
        inputValue: "",
      });
      this.scrollToBottom();
    }
  }

  sendMessage() {
    let { inputValue, user } = this.state;
    this.socket.emit("chat", {
      message: inputValue,
      sender: user,
    });
    // clear input
    this.setState({
      inputValue: "",
    });
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    const { target } = this.ref;
    console.log(target);
    target.scrollIntoView({ behavior: "smooth" });
  };

  handleRef = (el) => {
    this.ref = { target: el };
  };

  render() {
    let { feedback, user, messages, inputValue } = this.state;
    return (
      <section className="hero is-fullheight">
        <div className="hero-head box">
          <div className="container">
            <div className="tile is-ancestor">
              <div className="tile is-parent">
                <div className="tile is-child">
                  <p className="subtitle is-1">Socket.io messaging</p>
                  {/*<Messages messages={messages} feedback={feedback} handleRef={this.handleRef}/>*/}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-body">
          <div className="container">
            <div className="columns is-multiline is-centered">
              <div className="column is-3">
                <div className="field">
                  <div className="control">
                    <input
                      value={user}
                      type="text"
                      className="input"
                      id="sender"
                      onChange={(evt) => this.updateUser(evt)}
                      placeholder="Your Name"
                    />
                  </div>
                </div>
              </div>
              <div className="column is-5">
                <div className="field">
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={inputValue}
                      onChange={(evt) => this.updateInputValue(evt)}
                      onKeyPress={(event) => this.handleEnter(event)}
                      placeholder="Enter your message"
                    />
                  </div>
                </div>
              </div>
              <div className="column">
                <button
                  className="button is-primary"
                  id="btn"
                  onClick={this.sendMessage}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default App;
