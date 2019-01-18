import Taro, { Component } from '@tarojs/taro'
import { View, Button, Video } from '@tarojs/components'

import './index.less'

class Index extends Component {

  config = {
    navigationBarTitleText: '首页',
  }

  componentDidMount() {
    this.videoContext = Taro.createVideoContext('videoSample');
  }

  async handleLocation() {
    const location = await Taro.getLocation({
      altitude: true,
    });
    const { latitude, longitude} = location;
    const address = await Taro.request({
      url:  `${HOST}/geo.php`,
      data: {
        location: `${latitude},${longitude}`,
      }
    });
    Taro.showModal({
      title: '您的位置',
      content: address.data.result.address,
    })
  }

  handlePlay(){
    this.videoContext.play();
  }

  handlePause(){
    this.videoContext.pause();
  }

  render () {
    return (
      <View className='index'>
        <Video
          id='videoSample'
          className='video'
          src='http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
        />
        <Button type='primary' size='mini' onClick={this.handlePlay}>play</Button>
        {' '}
        <Button type='primary' size='mini' onClick={this.handlePause}>pause</Button>
        {' '}
        <Button type='primary' size='mini' onClick={this.handleLocation}>获取我的位置</Button>
      </View>
    )
  }
}

export default Index
