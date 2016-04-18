import React, { PropTypes, Component } from 'react';
<% if (pureRender) { -%>
    
import pureRender from 'pure-render-decorator';
<% } -%>

<% if (pureRender) { -%>
@pureRender
<% } -%>
export default class <%= indexComponentName %> extends Component {
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
