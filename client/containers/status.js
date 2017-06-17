import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {map, isObjectLike, isArray} from 'lodash';

import { setStatus } from 'actions';


class Status extends Component {

  componentDidMount() {
    let {setStatus} = this.props;
    fetch('/systeminformation/getDynamicData')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setStatus(data);
      });
  }

  componentWillUnmount() {
  }

  showHash(hash) {
    if (!isObjectLike(hash)) {
      return (
        <div className="row">
          <div className="col-12">{hash}</div>
        </div>
      );
    }
    let isArr = isArray(hash);
    return map(hash, (val, key) => {
      return (
        <div key={key} className="row">
          {isArr ? null : <div className="col-3">{key}</div>}
          <div className={isArr ? "col-12" : "col-9"}>{isObjectLike(val) ? this.showHash(val) : String(val)}</div>
        </div>
      );
    });
  }

  render() {
    let {statusInfos} = this.props;
    return (
      <div className="status-info col-12 row">
        {map(statusInfos, (stat, name) => {
          return (
            <div key={name} className="module col-6">
              <div className="module-inner ">
                <h3>{name}</h3>
                <div>{this.showHash(stat)}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  statusInfos: state.status
});

const mapDispatchToProps = dispatch => ({
  setStatus: bindActionCreators(setStatus, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Status);
