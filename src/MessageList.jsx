import React, { Component, PropTypes } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  static get propTypes() {
    return ({
      messages: PropTypes.array
    })
  }
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