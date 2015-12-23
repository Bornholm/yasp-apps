/* jshint esnext: true, node: true */
'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Grid, Col, Table, Button, Input } from 'react-bootstrap';
import { Actions } from './store';
import { RawEntryEditor } from './components';

class AppClient extends React.Component {

  static select(state) {
    return {
      entries: state.entries || []
    };
  }

  constructor() {
    super();
  }

  componentDidMount() {
    this.updateEntries();
  }

  render() {

    let rows = this.props.entries.map(entry => {
      return (
        /* jshint ignore:start */
        <tr key={entry.id}>
          <td>{this.getEntryComponent(entry)}</td>
          <td>
            <Button onClick={this.onRemoveEntryClick.bind(this, entry.id)}
              className="close" bsStyle="danger" bsSize="xsmall">
              <span aria-hidden="true">&times;</span>
            </Button>
          </td>
        </tr>
        /* jshint ignore:end */
      );
    });

    return (
      /* jshint ignore:start */
      <Grid>
        <Col md={12}>
          <h1>Reverse-Proxy</h1>
        </Col>
        <Col md={12}>
          <Table responsive>
            <thead>
              <tr>
                <th>Configuration</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              { rows }
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <RawEntryEditor ref="entryEdit" />
                </td>
                <td>
                  <Button onClick={this.onAddEntryClick.bind(this)} bsStyle="success">Ajouter</Button>
                </td>
              </tr>
            </tfoot>
          </Table>
        </Col>
      </Grid>
      /* jshint ignore:end */
    );

  }

  getEntryComponent(entry) {

    let component;

    // Default, return a basic raw editor
    component = (
      /* jshint ignore:start */
      <RawEntryEditor rawConfig={entry.raw} />
      /* jshint ignore:end */
    );

    return component;

  }

  updateEntries() {
    this.props.dispatch(Actions.Entries.fetchEntries());
  }

  onRemoveEntryClick(entryId) {
    this.props.dispatch(Actions.Entries.deleteEntry(entryId))
      .then(() => this.updateEntries())
    ;
  }

  onAddEntryClick() {
    let entryOpts = this.refs.entryEdit.getEntryOpts();
    this.props.dispatch(Actions.Entries.createEntry(entryOpts))
      .then(() => this.updateEntries())
    ;
  }

}

export default connect(AppClient.select)(AppClient);
