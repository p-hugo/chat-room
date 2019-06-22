import React, { useContext } from "react";
import { MessageContext } from "../context";
import MessageContainer from "../components/Message/Message.container";
import Input from "../components/Input";
import WelcomeScreen from "../components/WelcomeScreen";
import Wrapper from "../components/Layouts/Wrapper";

function getAccess(context) {
  if (context.state.user) {
    return (
      <>
        <MessageContainer
          user={context.state.user}
          incomingMessage={context.incomingMessage}
        />
        <Input typing={context.typing} onEnter={context.addMessage} />
      </>
    );
  }
  return <WelcomeScreen />;
}

export default function() {
  const context = useContext(MessageContext);
  return <Wrapper>{getAccess(context)}</Wrapper>;
}
