import express from 'express'
import socket from 'socket.io'
import colors from 'colors'

const app = express();
const port =  process.env.SERVER_PORT || 4000 ;

// Grab the server instance
let server = app.listen(port, () => {
    console.log(`Server running locally on port ${port}`);
});


// Socket setup
let io = socket(server);
let connectedUsers = [];
io.on('connection', (client) => {

    console.log(`Client Connected ${client.id}`.blue);

    client.emit('initial', { id: client.id, connected: connectedUsers.map(i => i.username) });

    // Listen for when user first connects
    client.on('connected', (username) => {
        io.sockets.emit('connected', username);
        connectedUsers.push({ id: client.id, username });
        console.log('Connected users:'.green);
        pprint(connectedUsers);
    });

    // Listen for chat events
    client.on('chat', (data) => {
        // send data to all sockets currently connected
        io.sockets.emit('chat', data);
        pprint(data);
    });

    // Broadcast that a user is typing
    client.on('typing', (username) => {
        client.broadcast.emit('typing', username);
    });

    // Close connection
    client.on('end', ({id, user}) => {
        client.disconnect(0);
        io.sockets.emit('end', user);
        connectedUsers  = connectedUsers.filter(val => val.id !==id);
        console.log(`${user} went offline`);
        pprint(connectedUsers);
    });

});

/**
 * Pretty prints a variable, works best with objects and arrays
 * @param {*} data Any data that needs to be printed nicely on the terminal
 */
function pprint(data) {
    console.log(JSON.stringify(data, null, "\t"));
}