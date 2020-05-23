import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text,Image,Input  } from "@tarojs/components";
import './outList.scss'
import OutGoods from '../../components/outGoods/outGoods'
class OutList extends Component {
  config = {
    navigationBarTitleText: "出货用户列表"
  };
  state = {
    data:[
      {
      name:1,
      type:2
    },
      {
        name:1,
        type:1
      },
      {
        name:1,
        type:1
      },

    ]
  };
  componentDidMount() {

  }
  render() {
    const {data} =this.state
    return (
      <View className='outListWrap'>
        <View className='goods'>
          <Image className='gImg'/>
          <View className='goodsInfo'>
            <Text className='gName'>adidas Yeezy Boost 700 Magnet磁铁</Text>
            <Text className='gNum'>货号：FV5577</Text>
          </View>

        </View>
        <View className='out'>
          {
            data.map((item,index)=><OutGoods data={item}/>)
          }
          <View className='contact'>
            <Image className='phone' src={require('../../assets/images/smartphone@2x.png')} />
            <Text >联系求货</Text>
          </View>
        </View>

      </View>
    );
  }
}

export default OutList;
