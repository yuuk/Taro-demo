import Taro from '@tarojs/taro';

export default function request(params){
  return Taro.request(params)
          .then(res => {
            if (res.statusCode === 200) {
              return res.data;
            } else {
              return Promise.reject(res);
            }
          })
}
