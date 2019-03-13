import React, { Component } from 'react';

class Message extends Component {

  render() {
    if (this.props.type === 'incomingMessage') {
      return (
        <div className="message" >
          <span className="message-username">{this.props.user}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      );
    } else {
      return (
        <div className="notification">
          <span className="notification-content">{this.props.content}</span>
        </div>
      )
    }
  }
}
export default Message;