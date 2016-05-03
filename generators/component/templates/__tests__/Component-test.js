import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('<%= componentName %>', () => {
  it('should exists', () => {
    const <%= componentName %> = require('../<%= componentName %>');

    const wrapper = shallow((
      <<%= componentName %> />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const <%= componentName %> = require('../<%= componentName %>');

    const wrapper = shallow((
      <<%= componentName %> />
    ));

    expect(wrapper.find('div')).to.have.length(1);
  });
});
