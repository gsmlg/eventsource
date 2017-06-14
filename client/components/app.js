import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Messages from './messages';
import MessageForm from './message_form';
import Ifconfig from './ifconfig';
import * as Actions from 'actions';

class App extends Component {
  componentDidMount() {
    let {actions} = this.props;
    let {update, add} = actions;
    this.evt = new EventSource('/messages');
    this.evt.addEventListener('update', (e) => {
      let data = JSON.parse(e.data);
      update(data);
    });
    this.evt.addEventListener('add', (e) => {
      let {text, time} = JSON.parse(e.data);
      add(text, time);
    });
  }

  render() {
    let {messages, actions, form} = this.props;
    return (
      <div className="app-wrapper">
        <Ifconfig />
        <MessageForm actions={actions} form={form} />
        <Messages messages={messages} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  form: state.form,
  messages: state.messages
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
