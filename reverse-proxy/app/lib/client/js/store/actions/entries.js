/* jshint esnext: true, node: true, browser: true */
'use strict';

/* Actions types */

const FETCH_ENTRIES = 'FETCH_ENTRIES';
const FETCH_ENTRIES_SUCCESS = 'FETCH_ENTRIES_SUCCESS';
const FETCH_ENTRIES_FAILED = 'FETCH_ENTRIES_FAILED';

const CREATE_ENTRY = 'CREATE_ENTRY';
const CREATE_ENTRY_SUCCESS = 'CREATE_ENTRY_SUCCESS';
const CREATE_ENTRY_FAILED = 'CREATE_ENTRY_FAILED';

const DELETE_ENTRY = 'DELETE_ENTRY';
const DELETE_ENTRY_SUCCESS = 'DELETE_ENTRY_SUCCESS';
const DELETE_ENTRY_FAILED = 'DELETE_ENTRY_FAILED';

/* Action creators */

function fetchEntries() {
  return function(dispatch) {

    dispatch({ type: FETCH_ENTRIES });

    return fetch('api/proxy')
      .then(res => res.json())
      .then(records => {
        dispatch({type: FETCH_ENTRIES_SUCCESS, records: records });
      })
      .catch(err => {
        dispatch({type: FETCH_ENTRIES_FAILED, error: err });
      })
    ;

  };
}

function createEntry(entryOpts) {
  return function(dispatch) {

    dispatch({
      type: CREATE_ENTRY,
      entryOpts: entryOpts
    });

    let reqOpts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entryOpts)
    };

    return fetch('api/proxy', reqOpts)
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: CREATE_ENTRY_SUCCESS,
          key: data.key,
          entryOpts: entryOpts
        });
      })
      .catch(err => {
        dispatch({type: CREATE_ENTRY_FAILED, error: err });
      })
    ;

  };
}

function deleteEntry(recordKey) {
  return function(dispatch) {

    dispatch({
      type: DELETE_ENTRY,
      key: recordKey
    });

    let reqOpts = {
      method: 'DELETE'
    };

    return fetch('api/proxy/'+recordKey, reqOpts)
      .then(res => res.json())
      .then(() => {
        dispatch({
          type: DELETE_ENTRY_SUCCESS,
          key: recordKey
        });
      })
      .catch(err => {
        dispatch({type: DELETE_ENTRY_FAILED, error: err });
      })
    ;

  };
}

module.exports = {

  FETCH_ENTRIES,
  FETCH_ENTRIES_SUCCESS,
  FETCH_ENTRIES_FAILED,

  CREATE_ENTRY,
  CREATE_ENTRY_SUCCESS,
  CREATE_ENTRY_FAILED,

  DELETE_ENTRY,
  DELETE_ENTRY_SUCCESS,
  DELETE_ENTRY_FAILED,

  fetchEntries,
  createEntry,
  deleteEntry

};
