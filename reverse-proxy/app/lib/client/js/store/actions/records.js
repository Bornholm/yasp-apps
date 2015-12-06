/* jshint esnext: true, node: true, browser: true */
'use strict';

/* Actions types */

const FETCH_RECORDS = 'FETCH_RECORDS';
const FETCH_RECORDS_SUCCESS = 'FETCH_RECORDS_SUCCESS';
const FETCH_RECORDS_FAILED = 'FETCH_RECORDS_FAILED';

const CREATE_RECORD = 'CREATE_RECORD';
const CREATE_RECORD_SUCCESS = 'CREATE_RECORD_SUCCESS';
const CREATE_RECORD_FAILED = 'CREATE_RECORD_FAILED';

const DELETE_RECORD = 'DELETE_RECORD';
const DELETE_RECORD_SUCCESS = 'DELETE_RECORD_SUCCESS';
const DELETE_RECORD_FAILED = 'DELETE_RECORD_FAILED';

/* Action creators */

function fetchRecords() {
  return function(dispatch) {

    dispatch({ type: FETCH_RECORDS });

    return fetch('api/records')
      .then(res => res.json())
      .then(records => {
        dispatch({type: FETCH_RECORDS_SUCCESS, records: records });
      })
      .catch(err => {
        dispatch({type: FETCH_RECORDS_FAILED, error: err });
      })
    ;

  };
}

function createRecord(from, to, opts) {
  return function(dispatch) {

    dispatch({
      type: CREATE_RECORD,
      from: from,
      to: to,
      opts: opts
    });

    let reqOpts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({from, to, opts})
    };

    return fetch('api/records', reqOpts)
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: CREATE_RECORD_SUCCESS,
          key: data.key,
          from: from,
          to: to,
          opts: opts
        });
      })
      .catch(err => {
        dispatch({type: CREATE_RECORD_FAILED, error: err });
      })
    ;

  };
}

function deleteRecord(recordKey) {
  return function(dispatch) {

    dispatch({
      type: DELETE_RECORD,
      key: recordKey
    });

    let reqOpts = {
      method: 'DELETE'
    };

    return fetch('api/records/'+recordKey, reqOpts)
      .then(res => res.json())
      .then(() => {
        dispatch({
          type: DELETE_RECORD_SUCCESS,
          key: recordKey
        });
      })
      .catch(err => {
        dispatch({type: DELETE_RECORD_FAILED, error: err });
      })
    ;

  };
}

module.exports = {

  FETCH_RECORDS,
  FETCH_RECORDS_SUCCESS,
  FETCH_RECORDS_FAILED,

  CREATE_RECORD,
  CREATE_RECORD_SUCCESS,
  CREATE_RECORD_FAILED,

  DELETE_RECORD,
  DELETE_RECORD_SUCCESS,
  DELETE_RECORD_FAILED,

  fetchRecords,
  createRecord,
  deleteRecord

};
