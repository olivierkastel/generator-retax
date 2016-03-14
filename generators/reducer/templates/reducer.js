import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

import {
  DEFAULT_ACTION,
} from 'constants/actions/<%= reducerName %>';

function getInitialState() {
  return fromJS({
    value: {},
  });
}

export default handleActions({
  [DEFAULT_ACTION](state, action) {
    return state.setIn(['value'], action.payload);
  },
}, getInitialState());
