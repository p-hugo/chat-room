## What this app is :rocket:

This is a demonstration of an express server running concurrently with a react app. It makes use of the [socket.io](https://socket.io/) library for configuring the socket connections between the connected users. The data is not persistent, once the server restarts it all starts fresh again. The functionaloty can be easily added but I don't have the means to host a database at the moment.

## If you have never used NodeJS before :thinking:

- If you want run this app on your machine please make sure you have [NodeJS](https://nodejs.org/en/) installed. 
- Once installed, clone this repo by running this on your terminal/cmd
##### `git clone https://github.com/p-hugo/chat-room.git`
 or just hit download
 - You will need to use your terminal and `cd` into the project
 - Inside the project run:
##### `npm install`
this will install the dependencies.
- Then you can go to the next section :smile:

## Available Scripts :computer:

In the project directory, you can run:

### `npm run dev`

Starts up the backend server and the react server. This is essentially what you want to run once you have installed the dependencies and want to try out the app.

:warning: **Note**: This app is still in development phase, there are things that are not fully implemented but will be soon.
