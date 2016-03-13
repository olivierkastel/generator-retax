import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('<%= indexContainerName %>', () => {
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
      'components/<%= indexComponentName %> ',
      require('helpers/test/componentsMock').<%= indexComponentName %>
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
    mockery.deregisterMock('components/<%= indexComponentName %>');
<% if (redux) { -%>
    mockery.deregisterMock('react-redux');
<% } -%>
    mockery.disable();
  });

  it('should exists', () => {
    const <%= indexContainerName %> = require('../<%= indexContainerName %>');

    const wrapper = shallow((
      <<%= indexContainerName %> />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const <%= indexContainerName %> = require('../<%= indexContainerName %>');

    const wrapper = shallow((
      <<%= indexContainerName %> />
    ));

    expect(wrapper.find('<%= indexComponentName %>')).to.have.length(1);
  });
});
