import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  // render all messages
  render() {
    const allMessages = this.props.messages.map(message => {
      return <Message color={message.color} type={message.type} key={message.id} user={message.username} content={message.content} />
    });

    return (
      <main className="messages">
        {allMessages}
      </main>
    );
  }
}
export default MessageList;   