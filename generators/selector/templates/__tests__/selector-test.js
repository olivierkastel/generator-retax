import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';
import mockery from 'mockery';
chai.use(sinonChai);
chai.use(dirtyChai);

import { fromJS } from 'immutable';

describe('<%= selectorName %> Selector', () => {
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
    const <%= selectorName %> = require('../<%= selectorName %>');
    expect(<%= selectorName %>).to.be.ok();
  });

  it('should test the <%= selectorName %>MapSelector selector', () => {
    const <%= selectorName %> = require('../<%= selectorName %>');

    expect(<%= selectorName %>.<%= selectorName %>MapSelector({
      <%= selectorName %>: fromJS({
        value: 0,
      }),
    })).to.equal(0);
  });
});
