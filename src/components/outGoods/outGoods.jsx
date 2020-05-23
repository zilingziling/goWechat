import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text,Image,Input  } from "@tarojs/components";

import './outGoods.scss'
class OutGoods extends Component{
  render(){
    return (
      <View className='outGoods '>
        <View className='normal'>
          <Image className='head'/>
          <View className='grid'>
            <View className='vertical'>
              <Text className='text'>44</Text>
              <Text className='grey'>尺码</Text>
            </View>
            <View className='vertical'>
              <Text className='text'>1-23</Text>
              <Text className='grey'>上架时间</Text>
            </View>
            <View className='vertical'>
              <Image className='icon'/>
              <Text className='grey'>普通用户</Text>
            </View>
            <View className='vertical'>
              <Text className='icon'/>
              <Text className='grey'>手动上架</Text>
            </View>
          </View>

        </View>
        <View className='vip'>
          <View className='and'>
            <View className='divide'></View>
            <Text className='andCenter'>AND</Text>
            <View className='divide'></View>
          </View>
          <View className='vipLogo'>
            <Image className='logo1' src={require('../../assets/images/logo@2x.png')}/>
            <Image className='logo2' src={require('../../assets/images/de@2x.png')}/>
            <Image className='logo3' src={require('../../assets/images/vip@2x.png')}/>
            <Image  className='logo4' src={require('../../assets/images/shop@2x.png')}/>
          </View>
        </View>

      </View>
    )
  }
}

export default OutGoods
