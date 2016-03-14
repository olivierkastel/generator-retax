import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { fromJS } from 'immutable';

import {
  DEFAULT_ACTION,
} from 'constants/actions/<%= reducerName %>';

import <%= reducerName %> from '../<%= reducerName %>';

describe('<%= capitalizedReducerName %> Reducer', () => {
  it('should exists', () => {
    expect(<%= reducerName %>).to.be.ok();
  });

  it('should handle the DEFAULT_ACTION', () => {
    let state = fromJS({ value: 0 });
    const action = {
      type: DEFAULT_ACTION,
      payload: 1,
    };

    expect(state.get('value').toJS()).to.equal(0);
    state = <%= reducerName %>(state, action);
    expect(state.get('value').toJS()).to.equal(1);
  });
});
