import { actionsCreatorFactory } from 'target';
import { annotator, AbstractActionsCreator } from 'target-components';

import {
  <%= firstActionConstant %>,
} from 'constants/actions/<%= actionCreatorName %>';

@annotator.ActionsCreator() // eslint-disable-line
export default class <%= ActionCreatorName %> extends AbstractActionsCreator {
  @annotator.action()
  <%= firstAction %> = actionsCreatorFactory(<%= firstActionConstant %>);
}
