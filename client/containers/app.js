import React, {Component} from 'react';
import { connect } from 'react-redux';

import System from'./system';
import Status from'./status';

class App extends Component {

  state = {
    view: 'system'
  }

  render() {
    let {view} = this.state;
    let View, b1c, b2c;
    let k1 = "btn btn-primary";
    let k2 = "btn btn-secondary";
    if (view == 'system') {
      View = System;
      b1c = k1;
      b2c = k2;
    } else {
      View = Status;
      b1c = k2;
      b2c = k1;
    }
    return (
      <div className="container-fluid">
        <div className="container">
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              onClick={e => this.setState({view: 'system'})}
              type="button"
              className={b1c}
              >
              System Info
            </button>
            <button
              onClick={e => this.setState({view: 'status'})}
              type="button"
              className={b2c}
              >
              System Status
            </button>
          </div>
        </div>
        <div className="container-fluid">
          <View />
        </div>
      </div>
    );
  }
}

export default connect()(App);
