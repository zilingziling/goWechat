import Taro, { Component } from "@tarojs/taro";
import './index.scss'
class SizeTag extends Component{
  render(){
    return (
      <View className='sizeTag'>{this.props.size}</View>
  )
  }
}

export default SizeTag
