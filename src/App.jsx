import React, { Component } from 'react';
import Nav from './Nav.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatInput: '',
      userInput: 'Anonymous', //  To clarify: userInput's state changes when the user modifies the input in the username box. currentUser saves the username set by the client user. 
      currentUser: 'Anonymous',
      messages: [],
      online: '',
      userColor: '#000'
    }

  }
  //  Handlers
  //    handles the number of users online nav and the current user's assigned default color
  handleUsersOnline = (e) => {
    this.setState({ online: e.content, userColor: e.nameColor })
  }
  //    handles modification of input values in the user field and chat field
  handleChange = (e) => {
    e.target.className === 'chatbar-message' ? this.setState({ chatInput: e.target.value }) : this.setState({ userInput: e.target.value });
  }
  //    handles OUTGOING messages and notifications, sending both for display in the chatbox to all connected clients
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
        content: e.target.value,
        color: this.state.userColor
      };
    }

    if (newMessage !== undefined) {
      this.socket.send(JSON.stringify(newMessage));
      this.setState({ chatInput: '' });
    }

  }
  //    add INCOMING message/notification to the messages array.
  addMessage = newMessage => {
    const oldMessages = this.state.messages;
    this.setState({ messages: [...oldMessages, newMessage] })
  };
  componentDidMount() {
    console.log("App Mounted");
    this.socket = new WebSocket('ws://0.0.0.0:3001');
    this.socket.addEventListener('message', e => {
      const msgData = JSON.parse(e.data);
      if (msgData.type === 'usersOnline') {
        this.handleUsersOnline(msgData);
      } else {
        this.addMessage(msgData);
      }

    });
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
