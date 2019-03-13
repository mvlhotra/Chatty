import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatInput: '',
      currentUser: { name: 'Bob' },
      messages: []
    }

  }
  genStr = () => {
    return Math.floor((1 + Math.random()) * 0x1000000)
      .toString(16)
      .substring(1);
  };

  handleChange = (e) => {
    if (e.target.className === 'chatbar-message') {
      this.setState({ chatInput: e.target.value });
    } else {
      this.setState({ currentUser: { name: e.target.value } })
    }
  }
  handleMessage = (e, user) => {

    const newMsg = {
      username: user,
      content: e.target.value
    }
    this.socket.send(JSON.stringify(newMsg));
    this.state.chatInput = '';
  }
  addMessage = newMsg => {
    const oldMessages = this.state.messages;
    this.setState({ messages: [...oldMessages, newMsg] })
  };
  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket('ws://0.0.0.0:3001');
    this.socket.addEventListener('open', event => {
      console.log('connecting...');
    });
    this.socket.addEventListener('message', event => {
      this.addMessage(JSON.parse(event.data));
    });
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = { id: 3, username: "Michelle", content: "Hello there!" };
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages })
    }, 3000);
  }
  render() {
    return (
      <div className='container'>
        <MessageList messages={this.state.messages} />
        <ChatBar user={this.state.currentUser.name} add={this.handleMessage} chatInput={this.state.chatInput} onChange={this.handleChange} />
      </div>
    );
  }
}
export default App;
