import React, { useContext } from "react";
import { MessageContext } from "../../Context";
import styles from "./Message.module.scss";
import styled from "styled-components";

const config = {
  hour: "numeric",
  minute: "numeric",
};

export default function Messages() {
  const { state } = useContext(MessageContext);

  const messageList = state.messages.map((message, cnt) => (
    <Message
      sender={message.sender}
      content={message.content}
      key={`${message.id}${cnt}`}
    />
  ));
  return <Panel>{messageList}</Panel>;
}

function Message({ sender, content }) {
  let date = new Date(),
    time = date.toLocaleString("en-Us", config);

  return (
    <div className={styles.container}>
      <figure>
        <img src={`https://ui-avatars.com/api/?name=${sender}`} alt="avatar" />
        {time}
      </figure>
      <div className={styles.wrapper}>
        <div className={styles.message}>{content}</div>
      </div>
    </div>
  );
}

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  min-height: 80vh;
  max-height: 80vh;
  overflow-y: scroll;
  grid-area: message;
`;
