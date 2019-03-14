import React, { Component } from 'react';
import Nav from './Nav.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import { createCipheriv, createPrivateKey } from 'crypto';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatInput: '',
      userInput: 'Anonymous',
      currentUser: 'Anonymous',
      messages: [],
      online: ''
    }

  }
  handleUsersOnline = (e) => {
    this.setState({ online: e.content })
  }
  handleChange = (e) => {
    if (e.target.className === 'chatbar-message') {
      this.setState({ chatInput: e.target.value });
    } else {
      this.setState({ userInput: e.target.value })
    }
  }

  handleMessage = (e, user) => {
    let newMessage;
    if (e.target.className === 'chatbar-username') {
      if (user !== this.state.currentUser) {
        newMessage = {
          type: 'postNotification',
          username: user,
          content: `${this.state.currentUser} changed their name to ${user}.`
        }
        this.setState({ currentUser: this.state.userInput });
      }
    } else {
      newMessage = {
        type: 'postMessage',
        username: user,
        content: e.target.value
      }
    }

    if (newMessage !== undefined) {
      this.socket.send(JSON.stringify(newMessage));
      this.setState({ chatInput: '' });
    }


  }
  addMessage = newMessage => {
    const oldMessages = this.state.messages;
    this.setState({ messages: [...oldMessages, newMessage] })
  };
  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket('ws://0.0.0.0:3001');
    this.socket.addEventListener('open', event => {
      console.log('connecting...');

    });

    this.socket.addEventListener('message', event => {
      const msgData = JSON.parse(event.data);
      if (msgData.type === 'usersOnline') {
        this.handleUsersOnline(msgData);
      } else {
        this.addMessage(msgData);
      }

    });

    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = { id: 3, username: "Michelle", content: "Hello there!" };
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({ messages: messages })
    // }, 3000);
  }
  render() {
    return (
      <div>
        <Nav count={this.state.online} />
        <div className='container'>
          <MessageList messages={this.state.messages} />
          <ChatBar notif={this.handleNotification} user={this.state.userInput} add={this.handleMessage} chatInput={this.state.chatInput} onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}
export default App;
