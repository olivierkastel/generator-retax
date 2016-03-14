import { createAction } from 'redux-actions';

import {
  <%= firstActionConstant %>,
} from 'constants/actions/<%= actionCreatorName %>';

export const <%= firstAction %> = createAction(<%= firstActionConstant %>);
