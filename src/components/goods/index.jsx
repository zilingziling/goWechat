import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text,Image,Input } from "@tarojs/components";
import './index.scss'
import SizeTag from '../../components/size'
class Goods extends Component{
  render(){
    return (
      <View className='goods'>
        <Image className='goodsImg'/>
        <View className='goodsDetail'>
          <Text className='name'>Nike Air Force 1 Low TS AF1 联名鬼脸拼接</Text>
          <Text className='num'>货号：FV5577</Text>
          <View className='size'>
            {
              size.map(item=><SizeTag size={item}/>)
            }
          </View>
        </View>
      </View>
    )
  }
}
export default Goods

const size=[36.5,34,36,37,38,39,40,41]
