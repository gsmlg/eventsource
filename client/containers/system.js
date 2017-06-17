import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {map, isObjectLike, isArray} from 'lodash';

import { setSystem } from 'actions';


class System extends Component {

  componentDidMount() {
    let {setSystem} = this.props;
    fetch('/systeminformation/getStaticData')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setSystem(data);
      });
  }

  componentWillUnmount() {
  }

  showHash(hash) {
    let isArr = isArray(hash);
    return map(hash, (val, key) => {
      return (
        <div key={key} className="row">
          {isArr ? <div className="col-1"> - </div> : <div className="col-3">{key}</div>}
          <div className={isArr ? "col-11" : "col-9"}>{isObjectLike(val) ? this.showHash(val) : String(val)}</div>
        </div>
      );
    });
  }

  render() {
    let {systemInfos} = this.props;
    let {cpu, graphics, net, os, system, version, versions} = systemInfos;
    return (
      <div className="system-info col-12 row" data-version={version}>

        <div className="system module col-6">
          <div className="module-inner ">
            <h3>System/OS</h3>
            <div>{this.showHash({System: system, OS: os})}</div>
          </div>
        </div>

        <div className="cpu module col-6">
          <div className="module-inner ">
            <h3>CPU</h3>
            <div>
              {this.showHash(cpu)}
            </div>
          </div>
        </div>

        <div className="graphics module col-6">
          <div className="module-inner ">
            <h3>Graphics</h3>
            <div>
              {this.showHash(graphics)}
            </div>
          </div>
        </div>

        <div className="net module col-6">
          <div className="module-inner ">
            <h3>Network Interfaces</h3>
            <div>
              {this.showHash(net)}
            </div>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  systemInfos: state.system
});

const mapDispatchToProps = dispatch => ({
  setSystem: bindActionCreators(setSystem, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(System);
