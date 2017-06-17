import React, {Component} from 'react';
import { connect } from 'react-redux';

import System from'./system';
import Status from'./status';

class App extends Component {

  render() {
    return (
      <div className="container-fluid">
        <div className="container">
        </div>
        <div className="container-fluid">
          <System />
          <Status />
        </div>
      </div>
    );
  }
}

export default connect()(App);
