import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text,Image,Input } from "@tarojs/components";
import './index.scss'
import SizeTag from '../../components/size'
class Goods extends Component{
  static defaultProps = {
    goodsInfo: {
      size:''
    },
  }
  toAskList=()=>{
    const {goodsInfo} =this.props
    Taro.navigateTo({
      url:`/pages/outList/outList?shoeNum=${goodsInfo.shoeNum}&&size=${goodsInfo.size}&&type=${goodsInfo.type}&&shoeName=${goodsInfo.shoeName}&&img=${goodsInfo.img}`
    })
  }
  render(){
    const {goodsInfo} =this.props
    return (
      <View className='goods' onClick={this.toAskList}>
        <Image className='goodsImg' src={goodsInfo.img}/>
        <View className='goodsDetail'>
          <Text className='name'>{goodsInfo.shoeName}</Text>
          <Text className='num'>货号：{goodsInfo.shoeNum}</Text>
          <View className='size'>
            {
              goodsInfo&&goodsInfo.size.split(',').map(item=><SizeTag size={item}/>)
            }
          </View>
        </View>
      </View>
    )
  }
}
export default Goods

const size=[36.5,34,36,37,38,39,40,41]
