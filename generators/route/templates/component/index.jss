export { default as <%= componentName %> } from './wrapper';
<% if (scaffoldIndexRoute) { -%>
export { default as <%= indexRouteName %> } from './index';
<% } -%>
