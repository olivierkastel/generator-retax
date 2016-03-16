<% if (!asyncRoute) { -%>
import index from 'routes/<%= routeName %>/container/indexRoute';

<% } -%>
export default function getRoute() {
  return {
<% if (asyncRoute) { -%>
    getComponent(location, callback) {
      require.ensure([], require => {
        const index = require('routes/<%= routeName %>/container/indexRoute');
        callback(null, index);
      });
    },
<% } else { -%>
    component: index,
<% } -%>
  };
}
