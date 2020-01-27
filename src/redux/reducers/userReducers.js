import * as types from '../constants';

export default function reducer(state={ currentUser: "guest" }, actions) {
  switch (actions.type) {

    case types.SET_USER:
      return {
        ...state,
        currentUser: actions.payload
      }

    default:
      return state
  }
}
