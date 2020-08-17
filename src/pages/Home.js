import React, { useContext } from "react";
import { MessageContext } from "../Context/";
import Input from "../Components/Input";
import { useHistory } from "react-router-dom";

function Home() {
  const { setName } = useContext(MessageContext);
  const history = useHistory();
  const handleOnEnter = (val) => {
    setName(val);
    history.push("/chat-room");
  };
  return (
    <section id="Login">
      <h1>
        Hello there, before you enter the chat please tell us your name{" "}
        <span role="img" aria-label="Smily face">
          😊
        </span>
      </h1>
      <Input onEnter={handleOnEnter} placeholder="Spongebob Squarepants" />
    </section>
  );
}

export default Home;
