export { default as <%= containerName %> } from './<%= containerName %>';
<% if (scaffoldIndexRoute) { -%>
export { default as <%= indexContainerName %> } from './<%= indexContainerName %>';
<% } -%>
