import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { fromJS } from 'immutable';

import {
  <%= firstActionConstant %>,
} from 'constants/actions/<%= reducerName %>';

import <%= reducerName %> from '../<%= reducerName %>';

describe('<%= capitalizedReducerName %> Reducer', () => {
  it('should exists', () => {
    expect(<%= reducerName %>).to.be.ok();
  });

  it('should handle the <%= firstActionConstant %>', () => {
    let state = fromJS({ value: 0 });
    const action = {
      type: <%= firstActionConstant %>,
      payload: 1,
    };

    expect(state.get('value').toJS()).to.equal(0);
    state = <%= reducerName %>(state, action);
    expect(state.get('value').toJS()).to.equal(1);
  });
});
