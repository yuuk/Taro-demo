import { FETCH_DATA_INFINITY, FETCH_DATA_PULL_DOWN } from '@actions/types/list';

const INITIAL_STATE = {
  listData: []
}

export default function list (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_DATA_INFINITY:
      return {
        ...state,
        listData: state.listData.concat(action.payload)
      }
    case FETCH_DATA_PULL_DOWN:
      return {
        ...state,
        listData: action.payload
      }
     default:
       return state
  }
}
