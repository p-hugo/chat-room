import React from 'react';
import { MessageContext } from '../../Context/index';
import Message from "./index";
import MessagePanel from "./MessagePanel";

const MessageContainer = () => (
    <MessagePanel>
        <MessageContext.Consumer>
            { context => (
                <>
                    { context.state.messages.map(m => (
                        <Message name={ m.sender } message={ m.content } key={ m.id }/>
                    )) }
                </>
            ) }
        </MessageContext.Consumer>
    </MessagePanel>
);

export default MessageContainer;