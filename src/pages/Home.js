import React, { useContext } from "react";
import { MessageContext } from "../Context";
import Messages from "../Components/Messages/";
import Input from "../Components/Input";
import WelcomeScreen from "../Components/WelcomeScreen";
import Wrapper from "../Components/Layouts/Wrapper";

function getAccess(context) {
  if (context.state.user) {
    return (
      <>
        <Messages />
        <Input
          typing={context.typing}
          onEnter={context.addMessage}
          minLength={1}
        />
      </>
    );
  }
  return <WelcomeScreen />;
}

export default function () {
  const context = useContext(MessageContext);
  return <Wrapper>{getAccess(context)}</Wrapper>;
}
