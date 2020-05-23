import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text,Image,Input  } from "@tarojs/components";
import './his.scss'
import Goods from '../../components/goods'

class His extends Component {
  config = {
    navigationBarTitleText: "TA的求货"
  };
  state = {
    data:[1,2,3,4,5],
  };
  componentDidMount() {

  }
  render() {

    return (
      <View className='hisWrap'>
        <View className='hisInfo'>
          <View className='info'>
            <Image  className='head'/>
            <View className='shop'>
              <Text className='name'>灯塔体育Sport</Text>
              <Text className='shopType'>仓库类型·主仓库</Text>
            </View>
          </View>
          <Image className='logo' src={require('../../assets/images/certification_big@2x.png')}/>
        </View>
        <View className='count'>
          <View className='divide'></View>
          <Text className='nums'>求货数量 - 26/双</Text>
          <View className='divide'></View>
        </View>
        {
          data.map(item=><Goods/>)
        }
      </View>
    );
  }
}

export default His;
