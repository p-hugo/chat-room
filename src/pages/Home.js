import React, { useContext } from "./node_modules/react";
import { MessageContext } from "../Context";
import MessageContainer from "../Components/Message/Message.container";
import Input from "../Components/Input";
import WelcomeScreen from "../Components/WelcomeScreen";
import Wrapper from "../Components/Layouts/Wrapper";

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
