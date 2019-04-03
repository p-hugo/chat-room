import React, {Component} from 'react';
import InputContainer from "../Input/Input.container";
import { MessageContext } from '../../Context/'
class WelcomeScreen extends Component {
    render() {
        return (
            <section id="Login">
                <h1>Hello there, before you enter the chat please tell us your name <span role="img" aria-label="Smily face">😊</span></h1>
                <MessageContext.Consumer>
                    {con => <InputContainer onEnter={con.setName} placeholder="Spongebob Squarepants" noClass/>}
                </MessageContext.Consumer>
            </section>
        )
    }
}

export default WelcomeScreen;