import { actionsCreatorFactory, annotator, AbstractActionsCreator } from 'retax';

import {
  <%= firstActionConstant %>,
} from 'constants/actions/<%= actionCreatorName %>';

@annotator.ActionsCreator()
export default class <%= ActionCreatorName %> extends AbstractActionsCreator {
  @annotator.action()
  <%= firstAction %> = actionsCreatorFactory(<%= firstActionConstant %>);
}
