import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import Back2Top from '@components/Back2Top';
import { fetchData } from '@actions/list';
import { LOADING_TYPE } from '@constants';
import './index.less';

function mapStateToProps({ list }) {
  return list;
}

@connect(mapStateToProps)
class List extends Component {

  config = {
    navigationBarTitleText: '列表',
    enablePullDownRefresh: true,
  }

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      showBack2Top: false,
    }
  }

  componentDidMount(){
    this.handleFetchData();
  }

  onPullDownRefresh() {
    this.setState({
      page: 1
    }, () => {
      this.handleFetchData(LOADING_TYPE.PULL_DOWN);
      Taro.stopPullDownRefresh();
    });
  }

  onReachBottom() {
    this.setState(prevState => ({
      page: prevState.page + 1
    }), () => {
      this.handleFetchData();
    });
  }

  onPageScroll(e) {
    if (e.scrollTop > 100) {
      this.setState({
        showBack2Top: true
      })
    } else {
      this.setState({
        showBack2Top: false
      })
    }
  }

  handleFetchData = async(type=LOADING_TYPE.INFINITY) => {
    const { dispatch } = this.props;
    const params = {
      _page: this.state.page,
      _limit: 20,
    };
    try {
      Taro.showLoading({ title: '数据加载中' });
      await dispatch(fetchData(params, type))
    } catch (e) {
      Taro.showToast({
        icon: 'none',
        title: '请求出错'
      });
    } finally {
      Taro.hideLoading();
    }
  }

  handleBack2Top() {
    Taro.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  }

  handleGoto(path){
    Taro.navigateTo({
      url: path,
    });
  }

  render () {
    const { showBack2Top } = this.state;
    const { listData } = this.props;
    return (
      <View className='list'>
        <Button onClick={this.handleGoto.bind(this, '/pages/index/index')}>去首页</Button>
        <View className='gird-contailer'>
          {
            listData.map(item => {
              return (
                <View key={item.id} className='grid'>
                  <View className='grid-inner'>
                    <Image src={item.thumbnailUrl} className='img' mode='widthFix' />
                    <View className='title-wrap'><Text className='title'>{item.title}</Text></View>
                  </View>
                </View>
              )
            })
          }
        </View>
        <Back2Top visible={showBack2Top} onClick={this.handleBack2Top} />
      </View>
    )
  }
}

export default List
