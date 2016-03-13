import React, { Component, PropTypes } from 'react';
<% if (redux) { -%>
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
<% } -%>

<% if (pureRender) { -%>
import { pureRender } from 'decorators';
<% } -%>
import <%= componentName %> from 'routes/<%= routeName %>/component/wrapper';

<% if (redux) { -%>
function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

<% } -%>
<% if (pureRender) { -%>
@pureRender
<% } -%>
<% if (redux) { -%>
@connect(mapStateToProps, mapDispatchToProps)
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
