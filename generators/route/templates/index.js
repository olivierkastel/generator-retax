<% if (scaffoldChildRoutes) { -%>
import warning from 'warning';
<% } -%>
import { <%= routeNameConstant %> } from 'constants/routes';
import <%= containerName %> from 'routes/<%= routeName %>/container/page';
<% if (scaffoldIndexRoute) { -%>
import <%= indexContainerName %> from 'routes/<%= routeName %>/container/index';
<% } -%>

<% if (asyncRoute) { -%>
export default function getRoute(requireAuthFunctions) {
  return {
    path: <%= routeNameConstant %>,
    onEnter: requireAuthFunctions.<%= routeAccessLevel %>,
    component: UserPage,
<% if (scaffoldIndexRoute) { -%>
    indexRoute: <%= indexContainerName %>,
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
  };
}
<% } else { -%>
export default {
  path: <%= routeNameConstant %>,
  component: UserPage,
<% if (scaffoldIndexRoute) { -%>
  indexRoute: <%= indexContainerName %>,
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
};
<% } -%>
