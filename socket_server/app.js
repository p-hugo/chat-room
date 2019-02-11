const   express     = require('express'),
        socket      = require('socket.io'),
        app         = express();

// Serving static files
app.use(express.static(`${__dirname}/public/`));


// Grab the server instance
let server = app.listen(4000, () =>{
    console.log(`Listening for request on port 4000`);
});


// Socket setup
let io = socket(server);

io.on('connection', (client) =>{

    console.log("Client Connected" + client.id);
    // Catch data send from the client
    client.on('chat', (data) =>{
        // send data to all sockets currently connected
        io.sockets.emit('chat', data);
        console.log(data);
    });

    // Broadcast that a user is typing
    client.on('typing', (username) => {
        client.broadcast.emit('typing', username);

    });


});