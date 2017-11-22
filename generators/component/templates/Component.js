import React, { Component } from 'react';
import propTypes from 'prop-types';
<% if (pureRender) { -%>
import pureRender from 'pure-render-decorator';
<% } -%>

<% if (pureRender) { -%>
@pureRender
<% } -%>
export default class <%= componentName %> extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="flex layout vertical">
        Yay!
      </div>
    );
  }
}
