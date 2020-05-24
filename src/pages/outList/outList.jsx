import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text,Image,Input,ScrollView  } from "@tarojs/components";
import './outList.scss'
import OutGoods from '../../components/outGoods/outGoods'
import api from "../../service/api";

class OutList extends Component {
  config = {
    navigationBarTitleText: "GO球鞋仓库"
  };
  state = {
    data:[],
    size:'',
    type:'',
    shoeName:'',
    img:'',
    shoeNum:'',
    pageSize:10,
    pageIndex:1,
    clickedId:'',
    totalPages:''
  };
  componentDidMount() {
    let shoeNum=this.$router.params.shoeNum
    // 上一页选中的尺码
    let size=this.$router.params.size
    let type=this.$router.params.type
    let shoeName=this.$router.params.shoeName
    let img=this.$router.params.img
    // 设置导航栏标题
    wx.setNavigationBarTitle({
      title:type==1? "出货单":"求货单"
    })
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
        let newData=r.data.data.list
        newData.forEach(item=> {
          item.checked = false;
        })
        this.setState({
          data:[...this.state.data,...newData],
          totalPages:r.data.data.totalPages
        })
      }
    })
  }
  onClickSingle=(id,wxNum)=>{
    let data=this.state.data
    data.forEach(item=> {
      item.checked = item.userId===id?true:false;
    })
    this.setState({
      data,
      clickedId:wxNum
    })
  }
  onContact=()=>{
    const {clickedId}=this.state
    if(clickedId){
      // 验证是否登录过
      wx.login({
        success (res) {
          if (res.code) {
            console.log(res.code)
            //发起网络请求
            // api.get('/v2/h5/getInfoByPhoneNum',{code:res.code}).then(r=>{
            //     console.log(r)
            // })
          } else {
          }
        }
      })
      // wx.setClipboardData({
      //   data: clickedId,
      //   success: function (res) {
      //     wx.getClipboardData({
      //       success: function (res) {
      //         wx.showToast({
      //           title: '已复制微信'
      //         })
      //       }
      //     })
      //   }
      // })
    }else {
      wx.showToast({
        title: '请先选择！',
        icon:'none'
      })
    }
  }
  scroll=()=>{
    this.setState({
      pageIndex:++this.state.pageIndex
    },()=>{
      if(this.state.pageIndex>this.state.totalPages){
        wx.showToast({
          title: '已达底部！',
          icon:'none'
        })
      }else{
        this.init()
      }
    })
  }
  render() {
    const {data, shoeNum, img, shoeName,type} =this.state
    return (
      <View className='outListWrap'>
        <View className='goods'>
          <Image className='gImg' src={img}/>
          <View className='goodsInfo'>
            <Text className='gName'>{shoeName}</Text>
            <Text className='gNum'>货号：{shoeNum}</Text>
          </View>
        </View>
        <ScrollView
          scrollY
          scrollWithAnimation
          onScrollToLower={this.scroll}
          className='out'>
          {
            data.map((item,index)=><OutGoods onClick={this.onClickSingle} data={{...item,choosedType:type}}/>)
          }
          <View className='contact' onClick={this.onContact}>
            <Image className='phone' src={require('../../assets/images/smartphone@2x.png')} />
            <Text >联系求货</Text>
          </View>
        </ScrollView>

      </View>
    );
  }
}

export default OutList;
