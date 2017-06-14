import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateIfcfg } from 'actions';

class Ifconfig extends Component {
  componentDidMount() {
    let {update} = this.props;
    this.evt = new EventSource('/ifconfig');
    this.evt.onmessage = (e) => {
      let data = atob(e.data);
      update(data);
    };
  }

  render() {
    let {ifconfig} = this.props;
    return (
      <div className="ifconfig">
        <pre>
          {ifconfig}
        </pre>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  ifconfig: state.ifconfig
});

const mapDispatchToProps = dispatch => ({
  update: bindActionCreators(updateIfcfg, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ifconfig);
