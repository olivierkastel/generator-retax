import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';
import mockery from 'mockery';
chai.use(sinonChai);
chai.use(dirtyChai);

import {
  <%= firstActionConstant %>,
} from 'constants/actions/<%= actionCreatorName %>';

describe('<%= actionCreatorName %> Action Creators', () => {
  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true,
    });
  });

  afterEach(() => {
    mockery.disable();
  });

  it('should exists', () => {
    const <%= actionCreatorName %> = require('../<%= actionCreatorName %>');
    expect(<%= actionCreatorName %>).to.be.ok();
  });

  it('should test the <%= firstAction %> creator', () => {
    const <%= actionCreatorName %> = require('../<%= actionCreatorName %>');

    expect(<%= actionCreatorName %>.<%= firstAction %>()).to.deep.equal({
      type: <%= firstActionConstant %>,
    });
  });
});
