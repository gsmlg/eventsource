import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Ping from './ping';
import Chart from './chart';
import { ping } from 'actions';

class App extends Component {
  componentDidMount() {
    let {ping} = this.props;
    this.evt = new EventSource('/ping');
    this.evt.addEventListener('ping', (e) => {
      let data = JSON.parse(e.data);
      ping(data);
    });
  }

  render() {
    return (
      <div className="app-wrapper">
        <Chart />
        <Ping />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ping: bindActionCreators(ping, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(App);
