import React, { Component, PropTypes } from 'react';
<% if (redux) { -%>
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
<% } -%>
<% if (pureRender) { -%>

import { pureRender } from 'decorators';
<% } -%>
import <%= indexComponentName %> from 'routes/<%= routeName %>/component/indexRoute';
<% if (redux && selector) { -%>
import <%= indexSelectorName %> from 'routes/<%= routeName %>/selector/indexRoute';
<% } -%>

<% if (redux && !selector) { -%>
function mapStateToProps() {
  return {};
}

<% } -%>
<% if (redux) { -%>
function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

<% } -%>
<% if (pureRender) { -%>
@pureRender
<% } -%>
<% if (redux && !selector) { -%>
@connect(mapStateToProps, mapDispatchToProps)
<% } else if (redux && selector) { -%>
@connect(<%= indexSelectorName %>, mapDispatchToProps)
<% } -%>
export default class <%= indexContainerName %> extends Component {
  static propTypes = {

  };

  render() {
    return (
      <<%= indexComponentName %>

      />
    );
  }
}
