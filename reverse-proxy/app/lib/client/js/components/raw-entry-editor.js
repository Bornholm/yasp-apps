/* jshint esnext: true, node: true */
'use strict';

import React from 'react';
import CodeMirror from 'react-code-mirror';
require('codemirror/mode/nginx/nginx');

class RawEntryEditor extends React.Component {

  constructor() {
    super();
    this.state = {
      rawConfig: ''
    };
    this.onChange = this.onChange.bind(this);
  }

  render() {
    let codeMirrorOpts = {
      mode: 'nginx',
      lineNumbers: true,
      viewportMargin: Infinity
    };
    return (
      /* jshint ignore:start */
      <CodeMirror
        readOnly={this.props.readOnly}
        value={this.state.rawConfig}
        onChange={this.onChange}
        {...codeMirrorOpts} />
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

  reset() {
    this.setState({rawConfig: ''});
  }

}

export default RawEntryEditor;
