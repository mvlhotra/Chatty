import React, { Component } from 'react';

class Nav extends Component {

  render() {
    const onlineCount = this.props.count === 1 ? `${this.props.count} user online` : `${this.props.count} users online`
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p className="navbar-online">{onlineCount}</p>
      </nav>
    );
  }
}
export default Nav;   