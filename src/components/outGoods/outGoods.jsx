import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text,Image,Input  } from "@tarojs/components";

import './outGoods.scss'
class OutGoods extends Component{
  static defaultProps = {
    data: {},
  }
  render(){
    const {data}=this.props
    return (
      <View className='outGoods '>
        <View className='normal'>
          <Image className='head'/>
          <View className='grid'>
            <View className='vertical'>
              <Text className='text'>{data.size}</Text>
              <Text className='grey'>尺码</Text>
            </View>
            <View className='vertical'>
              <Text className='text'>{data.createTime}</Text>
              <Text className='grey'>上架时间</Text>
            </View>
            <View className='vertical'>
              <Image className='icon' src={data.isVip===1?require('../../assets/images/vip@2x.png'):require('../../assets/images/certification@2x.png')}/>
              <Text className='grey'>{data.isVip===1?'会员用户':'普通用户'}</Text>
            </View>
            <View className='vertical'>
              <Image src={require('../../assets/images/up@2x.png')} className='icon' />
              <Text className='grey'>自动上架</Text>
            </View>
          </View>

        </View>
        {
          data.isMerchant===1&&<View className='vip'>
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
        }


      </View>
    )
  }
}

export default OutGoods
