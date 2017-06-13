import React, { Component } from 'react';

export default class Messages extends Component {
  render() {
    let {messages} = this.props;
    return (
      <ul>
        {messages.map((msg, n) => {
          return (
            <li key={n}>
              {msg.text}
            </li>
          );
        })}
      </ul>
    );
  }
}
