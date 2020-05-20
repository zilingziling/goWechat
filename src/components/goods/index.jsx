import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text,Image,Input } from "@tarojs/components";
import './index.scss'
class Goods extends Component{
  render(){
    return (
      <View className='goods'>
        <Image className='goodsImg'/>
        <View className='goodsDetail'>
          <Text className='name'></Text>
          <Text className='num'/>
          <View className='size'>

          </View>
        </View>
      </View>
    )
  }
}
export default Goods
