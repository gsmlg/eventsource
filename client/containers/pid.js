import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showPIDs } from 'actions';

class PID extends Component {

  componentDidMount() {
    let {showPIDs} = this.props;
    let evt = new EventSource('/pid');
    evt.addEventListener('update', (e) => {
      let data = atob(e.data);
      showPIDs(data);
    });
    this.evt = evt;
  }

  componentWillUnmount() {
    this.evt.close();
    this.evt = null;
  }

  render() {
    let {pid} = this.props;
    return (
      <div className="pid">
        <pre>
          {pid}
        </pre>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pid: state.pid
});

const mapDispatchToProps = dispatch => ({
  showPIDs: bindActionCreators(showPIDs, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PID);
