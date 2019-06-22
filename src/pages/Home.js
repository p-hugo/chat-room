import React, { useContext } from "react";
import { MessageContext } from "../context";
import Messages from "../components/Messages/";
import Input from "../components/Input";
import WelcomeScreen from "../components/WelcomeScreen";
import Wrapper from "../components/Layouts/Wrapper";

function getAccess(context) {
  if (context.state.user) {
    return (
      <>
        <Messages />
        <Input typing={ context.typing } onEnter={ context.addMessage }/>
      </>
    );
  }
  return <WelcomeScreen/>;
}

export default function () {
  const context = useContext(MessageContext);
  return <Wrapper>{ getAccess(context) }</Wrapper>;
}
