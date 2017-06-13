import React, { Component } from 'react';

export default class MessageForm extends Component {

  handleChange(e) {
    let {name, value} = e.target;
    this.setState({[name]: value});
  }

  render() {
    let {form, actions} = this.props;
    let {post, postDone: done, postFail: fail} = actions;
    return (
      <div className="message-form">
        <div className="form-row">
          <input
            type="text"
            disabled={form.sending}
            name="text" value={form.text}
            onChange={(e) => actions.input(e.target.value)}
            />
            <button
              disabled={form.sending}
              onClick={(e) => post(form.text, done, fail)}
              >Post</button>
        </div>
      </div>
    );
  }
}
