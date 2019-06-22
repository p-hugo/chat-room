import React, { useContext } from "react";
import { MessageContext } from "../../context/";
import Message from "./index";
import MessagePanel from "./MessagePanel";

export default function MessageContainer() {
  const { state } = useContext(MessageContext);
  const messageList = state.messages.map(m => (
    <Message name={m.sender} message={m.content} key={m.id} />
  ));
  return <MessagePanel>{messageList}</MessagePanel>;
}
