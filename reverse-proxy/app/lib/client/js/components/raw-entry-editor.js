/* jshint esnext: true, node: true */
'use strict';

import React from 'react';
import { Input } from 'react-bootstrap';

class RawEntryEditor extends React.Component {

  constructor() {
    super();
    this.state = {
      rawConfig: ''
    };
  }

  render() {
    return (
      /* jshint ignore:start */
      <Input type="textarea" ref="rawEntryInput"
        value={this.state.rawConfig} onChange={this.onChange.bind(this)} />
      /* jshint ignore:end */
    );
  }

  componentWillMount() {
    this.setState({rawConfig: this.props.rawConfig});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({rawConfig: nextProps.rawConfig});
  }

  onChange(evt) {
    this.setState({ rawConfig: evt.target.value });
  }

  getEntryOpts() {
    return {
      rawConfig: this.state.rawConfig
    };
  }

}

export default RawEntryEditor;
