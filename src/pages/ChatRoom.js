import React, { useContext } from "react";
import Messages from "../Components/Messages";
import Input from "../Components/Input";
import { MessageContext } from "../Context";

export default function Welcome() {
  const context = useContext(MessageContext);
  return (
    <React.Fragment>
      <Messages />
      <Input
        typing={context.typing}
        onEnter={context.addMessage}
        minLength={1}
      />
    </React.Fragment>
  );
}
