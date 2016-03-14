export { default as <%= selectorName %> } from './page';
<% if (scaffoldIndexRoute) { -%>
export { default as <%= indexSelectorName %> } from './index';
<% } -%>
