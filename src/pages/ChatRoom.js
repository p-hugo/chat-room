import React, { useContext } from "react";
import Messages from "../Components/Messages";
import Input from "../Components/Input";
import { MessageContext } from "../Context";

export default function Welcome() {
  const { isTyping, sendMessage } = useContext(MessageContext);
  return (
    <React.Fragment>
      <Messages />
      <Input typing={isTyping} onEnter={sendMessage} minLength={1} />
    </React.Fragment>
  );
}
