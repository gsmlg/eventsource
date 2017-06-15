import _ from 'underscore';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import Echarts from 'echarts';
import moment from 'moment';

class Chart extends Component {
  componentDidMount() {
    this.chart = Echarts.init(this.refs.chart);
    this.chart.setOption(this.getOption());
  }

  componentWillReceiveProps(nextProps) {
    this.chart.setOption(this.getOption());
  }

  tooltipFormatter(params) {
    var time = '';
    var text = _.map(params, (d) => {
      let name = d.seriesName;
      time = moment(d.value[0]).format('YYYY-MM-DD HH:mm:ss');
      let rtt = `${name} RTT: ${d.value[1]} ms`;
      return rtt;
    });
    text.unshift(time);
    return text.join('<br/>');
  }

  getOption() {
    let {chartData} = this.props;
    let data = _.toArray(chartData);
    if (_.isEmpty(data)) {
      data = [{name: 'Vultr', data: []}];
    }
    let option = {
      useUTC: false,
      // title: 'Vultr Ping',
      animation: 1000,
      animationDuration: 1000,
      animationDurationUpdate: 1000,
      legend: {
        show: true,
        data: _.pluck(data, 'name'),
        align: 'left',
        right: 40,
        top: 40,
        orient: 'vertical'
      },
      tooltip: {
        trigger: 'axis',
        formatter: this.tooltipFormatter,
        axisPointer: {
        }
      },
      grid: {
        left: 60
      },
      xAxis: {
        name: '',
        type: 'time',
        axisLabel: {
          rotate: 0,
          formatter: function(value, index) {
            let time = moment(value).format('MM-DD HH:mm')
            return time;
          }
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        name: 'Ping',
        type: 'value',
        min: 0,
        // max: 3500,
        boundaryGap: [0, '10%'],
        axisLabel: {
          formatter: function(value) {
            return `${value}ms`
          }
        },
        splitLine: {
          show: false
        }
      },
      series: _.map(data, d => ({
        name: d.name,
        type: 'line',
        showSymbol: false,
        data: d.data
      })),
    };
    return option;
  }

  render() {
    return (
      <div className="chart">
        <div ref="chart" className="chart-container"></div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  chartData: state.chartData
});

export default connect(
  mapStateToProps,
)(Chart);
