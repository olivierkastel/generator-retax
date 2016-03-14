import { createSelector } from 'reselect';

export function <%= selectorName %>Selector(state) {
  return state.<%= selectorName %>;
}

export const <%= selectorName %>MapSelector = createSelector(
  <%= selectorName %>Selector,
  <%= selectorName %> => <%= selectorName %>.get('value')
);
