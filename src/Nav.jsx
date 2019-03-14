import React, { Component, PropTypes } from 'react';

class Nav extends Component {
  static get propTypes() {
    return ({
      count: PropTypes.node
    });
  }
  render() {
    //  active user counter display validation
    const onlineCount = this.props.count === 1 ? `${this.props.count} user online` : `${this.props.count} users online`
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty <i className="far fa-comments"></i></a>
        <p className="navbar-online">{onlineCount}</p>
      </nav>
    );
  }
}
export default Nav;   