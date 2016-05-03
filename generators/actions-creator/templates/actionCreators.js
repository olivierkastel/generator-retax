import { actionsCreatorFactory } from 'retax';
import { annotator, AbstractActionsCreator } from 'retax-components';

import {
  <%= firstActionConstant %>,
} from 'constants/actions/<%= actionCreatorName %>';

@annotator.ActionsCreator() // eslint-disable-line
export default class <%= ActionCreatorName %> extends AbstractActionsCreator {
  @annotator.action()
  <%= firstAction %> = actionsCreatorFactory(<%= firstActionConstant %>);
}
