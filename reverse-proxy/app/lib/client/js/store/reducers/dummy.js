/* jshint esnext: true, node: true */
'use strict';
import Actions from '../actions';

export default function DummyReducer(currState, action) {

  let dummy = currState || null;

  switch(action.type) {

    case Actions.Dummy.DUMMY_SYNC:
      dummy = action.data;
      break;

    case Actions.Dummy.DUMMY_ASYNC_SUCCESS:
      dummy = action.data;
      break;

  }

  return dummy;

}
