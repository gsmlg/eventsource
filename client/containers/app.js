import React, {Component} from 'react';
import { connect } from 'react-redux';
// import CPU from './cpu';
// import Mem from './mem';
// import Disk from './disk';
import PID from './pid';

class App extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <PID />
      </div>
    );
  }
}

export default connect()(App);
