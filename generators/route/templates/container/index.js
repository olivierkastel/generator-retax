export { default as <%= containerName %> } from './page';
<% if (scaffoldIndexRoute) { -%>
export { default as <%= indexContainerName %> } from './indexRoute';
<% } -%>
