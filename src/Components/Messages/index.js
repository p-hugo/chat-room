import React, { useContext } from 'react';
import { MessageContext } from '../../context';
import MessagePanel from './MessagePanel';
import MessagePresenter from './Message.presenter';


export default function Messages() {
  const { state } = useContext(MessageContext);
  const messageList = state.messages.map(m => (
    <MessagePresenter name={ m.sender } message={ m.content } key={ m.id }/>
  ));
  return <MessagePanel>{ messageList }</MessagePanel>;
}