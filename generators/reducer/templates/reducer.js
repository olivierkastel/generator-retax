import { reducerFactory } from 'retax';
import { fromJS } from 'immutable';

import {
  <%= firstActionConstant %>,
} from 'constants/actions/<%= reducerName %>';

function getInitialState() {
  return fromJS({
    value: {},
  });
}

export default reducerFactory(
  getInitialState(),
  {
    [<%= firstActionConstant %>](state, action) {
      return state.setIn(['value'], action.payload);
    },
  }
);
