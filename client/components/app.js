import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Messages from './messages';
import * as Actions from 'actions';

class App extends Component {
  componentDidMount() {
    let {actions} = this.props;
    this.evt = new EventSource('/messages');
    this.evt.addEventListener('update', (e) => {
      console.log(e);
      let data = JSON.parse(e.data);
      actions.update(data);
    });
    this.evt.addEventListener('add', (e) => {
      console.log(e);
      let text = e.data;
      actions.add(text);
    });
  }

  render() {
    let {messages} = this.props;
    return (
      <div className="app-wrapper">
        <Messages messages={messages} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
