/* jshint esnext: true, node: true */
'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Grid, Col, Table, Button, Input } from 'react-bootstrap';
import { Actions } from './store';

class AppClient extends React.Component {

  static select(currentState) {
    return {
      records: {
        test: { from: 'localhost:8888', to: 'http://google.com' }
      }
    };
  }

  constructor() {
    super();
  }

  render() {

    let records = Object.keys(this.props.records || {}).map(key => {
      return { key: key, record: this.props.records[key] };
    });

    let rows = records.map(item => {

      console.log(item.record);

      return (
        /* jshint ignore:start */
        <tr key={item.key}>
          <td>
            <Input type="text" value={item.record.from} />
          </td>
          <td>
            <Input type="text" value={item.record.to} />
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
          <Button bsStyle="success">Enregistrer</Button>
        </Col>
        <Col md={12}>
          <Table responsive>
            <thead>
              <tr>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
              { rows }
            </tbody>
          </Table>
        </Col>
      </Grid>
      /* jshint ignore:end */
    );

  }

}

export default connect(AppClient.select)(AppClient);
