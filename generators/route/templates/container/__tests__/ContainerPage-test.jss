import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('<%= containerName %>', () => {
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
    mockery.registerMock(
      'components/<%= componentName %> ',
      require('helpers/test/componentsMock').<%= componentName %>
    );
<% if (redux) { -%>
    mockery.registerMock(
      'react-redux',
      require('helpers/test/reactReduxMock')
    );
<% } -%>
  });

  afterEach(() => {
<% if (pureRender) { -%>
    mockery.deregisterMock('decorators');
<% } -%>
    mockery.deregisterMock('components/<%= componentName %>');
<% if (redux) { -%>
    mockery.deregisterMock('react-redux');
<% } -%>
    mockery.disable();
  });

  it('should exists', () => {
    const <%= containerName %> = require('../<%= containerName %>');

    const wrapper = shallow((
      <<%= containerName %> />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const <%= containerName %> = require('../<%= containerName %>');

    const wrapper = shallow((
      <<%= containerName %> />
    ));

    expect(wrapper.find('<%= componentName %>')).to.have.length(1);
  });
});
