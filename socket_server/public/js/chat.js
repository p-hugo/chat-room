// Front end socket set up
const socket = io.connect('http://localhost:4000');

// Query the DOM
let message = document.getElementById('m'),
    sender = document.getElementById('sender'),
    output = document.getElementById('messages'),
    feedback = document.getElementById('feedback'),
    btn     = document.getElementById('btn');


// Trigger send button when Enter key is pressed
message.addEventListener('keyup', (event)=>{
    event.preventDefault();

    // Key code for enter is 13
    if(event.keyCode === 13){
        btn.click();
    }
})

// Emmit event when they click the button send
btn.addEventListener('click', ()=>{
    socket.emit('chat', {
        message: message.value,
        sender: sender.value
    });
    // clear input
    message.value = "";
});

// Emmit event when typing a message
message.addEventListener('keypress', () =>{

    // send the name of the person typing
    socket.emit('typing', sender.value);

});


//Listen for events coming from the server
socket.on('chat', (data) =>{
    feedback.innerHTML = "";
    output.innerHTML += `<li><strong>${data.sender}:</strong> ${data.message}</li>`;
});

// Someones typing
socket.on('typing', (username) => {
    feedback.innerHTML = `<p><em>${username} is typing a message...</em></p>`;
});