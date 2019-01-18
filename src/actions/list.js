import { FETCH_DATA_INFINITY, FETCH_DATA_PULL_DOWN } from '@actions/types/list';
import { fetchListService } from '@services/list';
import { LOADING_TYPE } from '@constants';

export function fetchDataInfinity(payload) {
  return {
    type: FETCH_DATA_INFINITY,
    payload,
  }
}

export function fetchDataPullDown(payload) {
  return {
    type: FETCH_DATA_PULL_DOWN,
    payload,
  }
}

export function fetchData (payload, type) {
  return dispatch => {
    return fetchListService(payload).then(res => {
      // 无限加载
      if (type === LOADING_TYPE.INFINITY) {
        dispatch(fetchDataInfinity(res));
      }
      // 下拉刷新
      if (type === LOADING_TYPE.PULL_DOWN) {
        dispatch(fetchDataPullDown(res));
      }
    })
  }
}
