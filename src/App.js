import React, {Component} from 'react';
import Wrapper from "./Components/Layouts/Wrapper";
import {MessageProvider, MessageContext} from "./Context";
import MessageContainer from "./Components/Message/Message.container";
import Input from "./Components/Input";
import WelcomeScreen from "./Components/WelcomeScreen";
// import './css/debug.css';

require('dotenv').config();

class App extends Component {

    render() {
        return (
            <MessageProvider>
                <Wrapper>
                    <MessageContext.Consumer>
                        { context => context.state.user ?
                            (
                                <>
                                    <MessageContainer
                                        user={context.state.user}
                                        incomingMessage={context.incomingMessage}
                                    />
                                    <Input typing={context.typing}/>
                                </>
                            ) :
                            (<WelcomeScreen setName={ context.setName }/>)
                        }
                    </MessageContext.Consumer>
                </Wrapper>
            </MessageProvider>
        );
    }
}

export default App;
