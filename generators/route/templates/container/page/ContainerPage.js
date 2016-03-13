import React, { Component, PropTypes } from 'react';
<% if (redux) { -%>
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
<% } -%>

<% if (pureRender) { -%>
import { pureRender } from 'decorators';
<% } -%>
import <%= componentName %> from 'routes/<%= routeName %>/component/page';
<% if (redux && selector) { -%>
import <%= selectorName %> from 'routes/<%= routeName %>/selector/page';
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
@connect(<%= selectorName %>, mapDispatchToProps)
<% } -%>
export default class <%= containerName %> extends Component {
  static propTypes = {

  };

  render() {
    return (
      <<%= componentName %>

      />
    );
  }
}
