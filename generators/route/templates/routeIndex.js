<% if (asyncRoute) { -%>
export { default as gen<%= capitalizedRouteName %>Route } from './<%= routeName %>';
<% } else { -%>
export { default as <%= routeName %>Route } from './<%= routeName %>';
<% } -%>
