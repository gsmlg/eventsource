import _ from 'underscore';
import React, {Component} from 'react';
import { connect } from 'react-redux';

class Ping extends Component {

  render() {
    let {hostInfos} = this.props;
    let hosts = [(
      <div key={'title'} className="host host-title">
        <span>Name</span>
        <span className="col-host">Host</span>
        <span>Address</span>
        <span>Active</span>
        <span>Time</span>
      </div>
    )];
    var list = _.toArray(hostInfos);
    _.each(_.sortBy(list, 'time'), function(host, i) {
      hosts.push(
        <div key={i} className="host">
          <span>{host.name}</span>
          <span className="col-host">{host.host}</span>
          <span>{host.numeric_host}</span>
          <span><i style={{color: host.alive ? 'green' : 'red'}} className="fa fa-circle"></i></span>
          <span>{host.time}</span>
        </div>
      );
    });
    return (
      <div className="ping">
        {hosts}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  hostInfos: state.hostInfos
});

export default connect(
  mapStateToProps,
)(Ping);
