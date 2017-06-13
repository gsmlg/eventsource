import React, { Component } from 'react';

export default class Messages extends Component {
  render() {
    let {messages} = this.props;
    return (
      <ul>
        {messages.map(msg => {
          return (
            <li >
              <time datetime={msg.time}>{msg.time}</time>
              {msg.text}
            </li>
          );
        })}
      </ul>
    );
  }
}
