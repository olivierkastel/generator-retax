import React, { PropTypes, Component } from 'react';
<% if (pureRender) { -%>
import { pureRender } from 'decorators';
<% } -%>

<% if (pureRender) { -%>
@pureRender
<% } -%>
export default class <%= indexRouteName %> extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="flex layout vertical">
        Index Route.
      </div>
    );
  }
}
