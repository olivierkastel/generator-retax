import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

import {
  <%= firstActionConstant %>,
} from 'constants/actions/<%= reducerName %>';

function getInitialState() {
  return fromJS({
    value: {},
  });
}

export default handleActions({
  [<%= firstActionConstant %>](state, action) {
    return state.setIn(['value'], action.payload);
  },
}, getInitialState());
