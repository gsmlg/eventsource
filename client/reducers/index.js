import {combineReducers} from "redux";
import hostInfos from './ping';
import chartData from './chart';

export default combineReducers({
  hostInfos,
  chartData,
});
