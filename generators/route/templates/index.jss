<% if (scaffoldChildRoutes) { -%>
import warning from 'warning';
<% } -%>
import { <%= routeNameConstant %> } from 'constants/routes';
import <%= containerName %> from 'routes/<%= routeName %>/container';
<% if (scaffoldIndexRoute) { -%>
import <%= indexRouteName %> from 'routes/<%= routeName %>/component/index';
<% } -%>

<% if (asyncRoute) { -%>
export default function getRoute(requireAuthFunctions) {
  return {
    path: <%= routeNameConstant %>,
    onEnter: requireAuthFunctions.<%= routeAccessLevel %>,
    component: UserPage,
<% if (scaffoldIndexRoute) { -%>
    indexRoute: <%= indexRouteName %>,
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
  indexRoute: <%= indexRouteName %>,
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
