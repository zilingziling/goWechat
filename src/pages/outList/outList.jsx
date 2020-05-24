import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text,Image,Input  } from "@tarojs/components";
import './outList.scss'
import OutGoods from '../../components/outGoods/outGoods'
import api from "../../service/api";

class OutList extends Component {
  config = {
    navigationBarTitleText: "出货用户列表"
  };
  state = {
    data:[],
    size:'',
    type:'',
    shoeName:'',
    img:'',
    shoeNum:'',
    pageSize:10,
    pageIndex:1
  };
  componentDidMount() {
    let shoeNum=this.$router.params.shoeNum
    let size=this.$router.params.size
    let type=this.$router.params.type
    let shoeName=this.$router.params.shoeName
    let img=this.$router.params.img
    this.setState({
      shoeNum,
      size,
      type,
      img,
      shoeName
    },()=>this.init())

  }
  init=()=>{
    const {shoeNum,size,type,pageSize,pageIndex}=this.state
    api.get('/v2/h5/matchUserHallList',{shoeNum,size,type,pageSize,pageIndex}).then(r=>{
      if(r.data.code===0){
        this.setState({
          data:r.data.data.list
        })
      }
    })
  }
  render() {
    const {data, shoeNum, img, shoeName} =this.state
    return (
      <View className='outListWrap'>
        <View className='goods'>
          <Image className='gImg' src={img}/>
          <View className='goodsInfo'>
            <Text className='gName'>{shoeName}</Text>
            <Text className='gNum'>货号：{shoeNum}</Text>
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
