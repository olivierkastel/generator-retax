<% if (scaffoldChildRoutes && asyncRoute) { -%>
import warning from 'warning';

<% } -%>
import { <%= routeNameConstant %> } from 'constants/routes';
<% if (!asyncRoute) { -%>
import <%= containerName %> from 'routes/<%= routeName %>/container/page';
<% if (scaffoldIndexRoute) { -%>
import getIndexRoute from 'routes/<%= routeName %>/indexRoute';
<% } -%>
<% } -%>

export default function getRoute(requireAuthFunctions) {
  return {
    path: <%= routeNameConstant %>,
    onEnter: requireAuthFunctions.<%= routeAccessLevel %>,
<% if (asyncRoute) { -%>

    getComponent(location, callback) {
      require.ensure([], require => {
        const container = require('routes/<%= routeName %>/container/page');
        callback(null, container);
      });
    },
<% if (scaffoldIndexRoute) { -%>

    getIndexRoute(location, callback) {
      require.ensure([], require => {
        const getIndexRoute = require('routes/<%= routeName %>/indexRoute');
        callback(null, getIndexRoute());
      });
    },
<% } -%>
<% if (scaffoldChildRoutes) { -%>

    getChildRoutes(location, callback) {
      require.ensure([], require => {
        let routes = [];
        try {
          routes = [];
        } catch (e) {
          warning(false, e);
        } finally {
          callback(null, routes);
        }
      });
    },
<% } -%>
<% } else { -%>
    component: <%= containerName %>,
<% if (scaffoldIndexRoute) { -%>
    indexRoute: getIndexRoute(),
<% } -%>
<% if (scaffoldChildRoutes) { -%>
    childRoutes: [],
<% } -%>
<% } -%>
  };
}
