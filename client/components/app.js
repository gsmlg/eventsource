import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Messages from './messages';
import * as Actions from 'actions';

class App extends Component {
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
