import React, { Component } from 'react';
import moment from 'moment';

export default class Messages extends Component {
  render() {
    let {messages} = this.props;
    return (
      <ul className="messages-list">
        {messages.map((msg, n) => {
          return (
            <li key={n} className="message-item">
              <time datetime={msg.time}>{moment(msg.time).format('HH:mm:ss')}</time>
              <span className="text">{msg.text}</span>
            </li>
          );
        })}
      </ul>
    );
  }
}
