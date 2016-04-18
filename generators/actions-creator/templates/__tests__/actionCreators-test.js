import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';
chai.use(sinonChai);
chai.use(dirtyChai);

import {
  <%= firstActionConstant %>,
} from 'constants/actions/<%= actionCreatorName %>';

describe('<%= actionCreatorName %>ActionsCreator', () => {
  it('should exists', () => {
    const <%= ActionCreatorName %> = require('../<%= actionCreatorName %>');
    expect(<%= ActionCreatorName %>).to.be.ok();
  });

  it('should test the <%= firstAction %> creator', () => {
    const <%= ActionCreatorName %> = require('../<%= actionCreatorName %>');

    const ac = new <%= ActionCreatorName %>();

    expect(ac).to.be.ok();

    expect(ac.<%= firstAction %>(1)).to.deep.equal({
      type: <%= firstActionConstant %>,
      payload: 1,
    });
  });
});
