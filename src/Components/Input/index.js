import React from 'react';
import {MessageContext} from '../../Context';
import InputContainer from "./Input.container";
const Input = ({typing}) => (
    <MessageContext.Consumer>
        {context => <InputContainer onEnter={context.addMessage} typing={typing} />}
    </MessageContext.Consumer>
);

export default Input;