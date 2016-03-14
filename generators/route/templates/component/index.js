export { default as <%= componentName %> } from './page';
<% if (scaffoldIndexRoute) { -%>
export { default as <%= indexComponentName %> } from './index';
<% } -%>
