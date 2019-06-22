import React, { useContext } from "react";
import { MessageContext } from "../../Context/";
import Input from "../Input";

export default function() {
  const { setName } = useContext(MessageContext);
  return (
    <section id="Login">
      <h1>
        Hello there, before you enter the chat please tell us your name{" "}
        <span role="img" aria-label="Smily face">
          😊
        </span>
      </h1>
      <Input onEnter={setName} placeholder="Spongebob Squarepants" />
    </section>
  );
}
