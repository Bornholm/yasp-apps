/* jshint esnext: true, node: true, browser: true */
'use strict';

/* Actions types */

const DUMMY_SYNC = 'DUMMY_SYNC';

const DUMMY_ASYNC = 'DUMMY_ASYNC';
const DUMMY_ASYNC_SUCCESS = 'DUMMY_ASYNC_SUCCESS';
const DUMMY_ASYNC_FAILED = 'DUMMY_ASYNC_FAILED';

/* Action creators */

function doSyncAction(data) {
  return { type: DUMMY_SYNC, data: data };
}

function doAsyncAction(data) {
  return function(dispatch, getState) {
    dispatch({ type: DUMMY_ASYNC, data: data });

    setTimeout(function() {
      dispatch({ type: DUMMY_ASYNC_SUCCESS, data: data });
      // or dispatch DUMMY_ASYNC_FAILED on error
    }, 2000);

  };
}

module.exports = {

  DUMMY_SYNC,

  DUMMY_ASYNC,
  DUMMY_ASYNC_SUCCESS,
  DUMMY_ASYNC_FAILED,

  doSyncAction,
  doAsyncAction

};
