import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text,Image,Input  } from "@tarojs/components";
import api from "../../service/api";
import './goodsDetail.scss'
import BigSize from '../../components/bigSize/bigSize'
class GoodsDetail extends Component {
  config = {
    navigationBarTitleText:'GO球鞋仓库'
  };
  state = {
    sizeData:[],
    size:'',
    type:'',
    shoeName:'',
    img:'',
    shoeNum:'',
    pageSize:10,
    pageIndex:1,
    clickedSize:''
  };
  componentDidMount() {
    let shoeNum=this.$router.params.shoeNum
    let size=this.$router.params.size
    let type=this.$router.params.type
    let shoeName=this.$router.params.shoeName
    let img=this.$router.params.img
    wx.setNavigationBarTitle({
      title:type==1? "出货单详情":"求货单详情"
    })
    this.setState({
      shoeNum,
      size,
      type,
      img,
      shoeName
    })
  //   获取尺码详情
    api.get('/v2/h5/getOutSupplyDemandHallInfos',{type,shoeNum}).then(r=>{
      if(r.data.code===0){
        let newData=r.data.data
        newData.forEach(item=> {
          item.checked = false;
        })
          this.setState({
          sizeData:newData
        })
      }else {
        wx.showToast({
          title: '服务器错误！',
          icon:'none'
        })
      }
    })
  }
  onClickeSize=size=>{
    let data=this.state.sizeData
    data.forEach(item=> {
      item.checked = item.size===size?true:false;
    })
    this.setState({
      sizeData:data,
      clickedSize:size
    })
  }
  toMatchList=()=>{
    const {shoeNum,clickedSize,shoeName,type,img}=this.state
    if(clickedSize){
      Taro.navigateTo({
        url:`/pages/outList/outList?shoeNum=${shoeNum}&&size=${clickedSize}&&type=${type}&&shoeName=${shoeName}&&img=${img}`
      })
    }else {
      wx.showToast({
        title: '请先选择尺码！',
        icon:'none'
      })
    }
  }
  onCopyShoeNum=()=>{
    wx.setClipboardData({
      data: this.state.shoeNum,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '已复制货号'
            })
          }
        })
      }
    })
  }
  onPullDownRefresh(){
    Taro.stopPullDownRefresh()
  }
  render() {
    const {sizeData,shoeNum,
      size,
      type,shoeName,img}=this.state
    return (
      <View className='goodsDetail' >
        <View className='goods'>
          <Image className='gImg' src={img}/>
          <View className='goodsInfo'>
            <Text className='gName'>{shoeName}</Text>
            <View className='flex'>
              <Text className='gNum'>货号：{shoeNum}</Text>
              <Image onClick={this.onCopyShoeNum} className='copy' src={require('../../assets/images/copy.png')} />
            </View>
          </View>

        </View>
        <View className='hr'></View>
        <View className='sizes'>
          <Text className='h2'>
            出货尺码
          </Text>
          <View className='sizeWrapper'>
            {
              sizeData.map((item,index)=><BigSize onClick={this.onClickeSize} key={index} size={item}/>)
            }
          </View>
          <View className='note'>
            选择某个尺码，查看尺码的求货列表
          </View>
        </View>
        <View className='check' onClick={this.toMatchList}>
          {type==1? "查看出货单":"查看求货单"}
        </View>
      </View>
    );
  }
}

export default GoodsDetail;
