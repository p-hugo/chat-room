import React from './node_modules/react';
//pass in an array of messages and feedback user if it exist
const Messages = ({messages, feedback, handleRef}) =>
   <>
        <ul id="messages" className='scrollable' >
            {messages.map((content, index) =>

                <li key={index}><strong>{content.user}:</strong> {content.message}</li>
            )}
            <li style={ {visibility: "hidden"} } ref={el => handleRef(el)}>.</li>
        </ul>
        {(feedback.ready) ? <div id="feedback" className="has-text-info"><em>{feedback.user} is typing...</em></div>: ""}
   </>
export default Messages;