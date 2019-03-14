import React, { Component } from 'react';

class Message extends Component {

  render() {
    {/* Different renderings are returned depending on the type of message. */ }
    if (this.props.type === 'incomingMessage') {
      {/* Regex source: https://regex101.com/r/l2Zt7S/1 
        The regex below checks if the message sent includes a link. If so, return a message div with an image.
      */}
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