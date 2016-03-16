import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('<%= indexComponentName %>', () => {
  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true,
    });
<% if (pureRender) { -%>
    mockery.registerMock(
      'decorators',
      require('helpers/test/decoratorsMock')
    );
<% } -%>
  });

  afterEach(() => {
<% if (pureRender) { -%>
    mockery.deregisterMock('decorators');
<% } -%>
    mockery.disable();
  });

  it('should exists', () => {
    const <%= indexComponentName %> = require('../<%= indexComponentName %>');

    const wrapper = shallow((
      <<%= indexComponentName %> />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const <%= indexComponentName %> = require('../<%= indexComponentName %>');

    const wrapper = shallow((
      <<%= indexComponentName %> />
    ));

    expect(wrapper.find('div')).to.have.length(1);
  });
});
