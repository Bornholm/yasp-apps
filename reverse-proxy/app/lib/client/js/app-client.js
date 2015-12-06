/* jshint esnext: true, node: true */
'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Grid, Col, Table, Button, Input } from 'react-bootstrap';
import { Actions } from './store';

class AppClient extends React.Component {

  static select(state) {
    return {
      records: state.records || []
    };
  }

  constructor() {
    super();
  }

  componentDidMount() {
    this.updateRecords();
  }

  render() {

    let rows = this.props.records.map(item => {

      return (
        /* jshint ignore:start */
        <tr key={item.key}>
          <td>{item.record.from}</td>
          <td>{item.record.to}</td>
          <td>
            <Button onClick={this.onRemoveRecordClick.bind(this, item.key)}
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
                <th>Source</th>
                <th>Destination</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              { rows }
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <Input ref="fromInput" type="text" />
                </td>
                <td>
                  <Input ref="toInput" type="text" />
                </td>
                <td>
                  <Button onClick={this.onAddRecordClick.bind(this)} bsStyle="success">Ajouter</Button>
                </td>
              </tr>
            </tfoot>
          </Table>
        </Col>
      </Grid>
      /* jshint ignore:end */
    );

  }

  updateRecords() {
    this.props.dispatch(Actions.Records.fetchRecords());
  }

  onRemoveRecordClick(recordKey) {
    this.props.dispatch(Actions.Records.deleteRecord(recordKey))
      .then(() => this.updateRecords())
    ;
  }

  onAddRecordClick() {

    let from = this.refs.fromInput.getValue();
    let to = this.refs.toInput.getValue();

    this.props.dispatch(Actions.Records.createRecord(from, to))
      .then(() => this.updateRecords())
    ;

  }

}

export default connect(AppClient.select)(AppClient);
