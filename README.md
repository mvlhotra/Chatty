# Chatty

Chatty is a simple real-time browser chat client, similar to Slack, Twitter or Facebook Messenger.

With starter code provided by Lighthouse Labs, the final product was built as a way to primarily practice React and WebSockets skills, along with overall web development skills.

## Current Features

- Connect to server, join the chat
- Send messages under a screenname defined by you
- See number of users online
- Send images by pasting an img url in the chatbox.
- See when other chatters change their name.

### Feature Demo

!["Chat Demo"](https://github.com/mvlhotra/Chatty/blob/master/build/Chatty_demo.gif)


## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web client using the `npm start` command. The app will be served at <http://localhost:3000/>.
4. Open another terminal window and enter the following command: `cd Chatty/chatty_server`
5. Install WebSocket dependencies using the `npm install` command.
6. Start the WebSocket server using the `npm start` command. 
7. Go to <http://localhost:3000/> in your browser. To demo multiple users chatting, open multiple browser windows.

## Dependencies

### Client:
* node-sass
* eslint (with React plugin)
* sockjs-client
* style-loader
* css-loader
* sass-loader
* randomcolor
* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)

### Server:
* Express
* randomcolor
* uuid
* ws (WebSocket)


## Todos

- Notify users when someone has entered the chat
- Emoji picker
- Deploy app online
- UI mods
- Shortcuts

## Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```




