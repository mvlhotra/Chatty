import React, { Component } from 'react';

class Message extends Component {

  render() {
    if (this.props.type === 'incomingMessage') {
      if (RegExp('(http(s?):)|([/|.|\w|\s])*\.(?:jpe?g|gif|png)').test(this.props.content)) {
        return (
          <div className="message" >
            <span style={{ color: this.props.color }} className="message-username">{this.props.user}</span>
            <span className="message-content"><img src={this.props.content} /></span>
          </div>
        );
      }
      return (
        <div className="message" >
          <span style={{ color: this.props.color }} className="message-username">{this.props.user}</span>
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