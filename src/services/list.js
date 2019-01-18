import request from '@utils/request';

export function fetchListService(params) {
  return request({
    url: `${HOST}/photos.php`,
    data: params,
  });
}

export function a() {

}
