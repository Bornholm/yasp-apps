/* jshint esnext: true, node: true */
'use strict';
import Actions from '../actions';

export default function RercordsReducer(currState, action) {

  let records = currState || null;

  switch(action.type) {

    case Actions.Records.FETCH_RECORDS_SUCCESS:
      records = action.records;
      break;

  }

  return records;

}
