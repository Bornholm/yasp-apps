/* jshint esnext: true, node: true */
'use strict';
import Actions from '../actions';

export default function EntriesReducer(currState, action) {

  let entries = currState || null;

  switch(action.type) {

    case Actions.Entries.FETCH_ENTRIES_SUCCESS:
      entries = action.records;
      break;

  }

  return entries;

}
