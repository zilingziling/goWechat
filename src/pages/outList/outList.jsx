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
    totalPages:'',
    contactParams:{}
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
  onPullDownRefresh(){
    Taro.stopPullDownRefresh()
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
      }else {
        wx.showToast({
          title: '服务器错误！',
          icon:'none'
        })
        this.setState({
          pageIndex: this.state.pageIndex-1
        })
      }
    })
  }
  onClickSingle=(dataParams)=>{
    let data=this.state.data
    data.forEach(item=> {
      item.checked = item.userId===dataParams.userId?true:false;
    })
    this.setState({
      data,
      clickedId:dataParams.wxNum,
      contactParams: dataParams
    })
  }
  getUserInfo=()=>{
    const {clickedId,contactParams,type}=this.state
    // 查看是否授权
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              wx.setStorageSync('aboutUser', res.userInfo);
              //   // 验证是否登录过
                let token =wx.getStorageSync('token');
                let userInfo =wx.getStorageSync('userInfo');
                if(token){
                  // 调用联系接口
                  api.post('/v2/h5/contactHall',{
                    createTime:contactParams.createTime,
                    matchUserId:contactParams.userId,
                    shoeNum:contactParams.shoeNum,
                    size:contactParams.size,
                    type,
                    userId:userInfo.id
                  }).then(resp=>{
                    if(resp.data.code===0){
                      // wx.showToast({
                      //   title: '联系成功！'
                      // })
                    }
                  })
                  wx.setClipboardData({
                    data: clickedId,
                    success: function (res) {
                      wx.getClipboardData({
                        success: function (res) {
                          wx.showToast({
                            title: '已复制微信'
                          })
                        }
                      })
                    }
                  })
                }
                else {
                  // token 不存在
                  wx.login({
                    success (res) {
                      if (res.code) {
                        //发起网络请求
                          api.get('/v2/h5/getInfoByPhoneNum',{code:res.code}).then(r=>{
                            if(r.data.code===0){
                              wx.setStorageSync('userInfo', r.data.data);
                              if(r.data.data.token){
                                wx.setStorageSync('token',r.data.data.token)
                                api.post('/v2/h5/contactHall',{
                                  createTime:contactParams.createTime,
                                    matchUserId:contactParams.userId,
                                  shoeNum:contactParams.shoeNum,
                                  size:contactParams.size,
                                  type,
                                  userId:userInfo.id
                                }).then(resp=>{
                                  if(resp.data.code===0){
                                    // wx.showToast({
                                    //   title: '联系成功！'
                                    // })
                                  }
                                })
                                wx.setClipboardData({
                                  data: clickedId,
                                  success: function (res) {
                                    wx.getClipboardData({
                                      success: function (res) {
                                        wx.showToast({
                                          title: '已复制微信'
                                        })
                                      }
                                    })
                                  }
                                })
                              }else {
                                Taro.navigateTo({
                                  url:'/pages/login/login'
                                })
                              }
                          }
                        })
                      }
                    }
                  })
                }
            }
          })
        }
      }
    })

  }
  scroll=()=>{
    this.setState({
      pageIndex:++this.state.pageIndex
    },()=>{
      if(this.state.pageIndex>this.state.totalPages){
        wx.showToast({
          title: '已加载全部！',
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
          <Button disabled={!this.state.clickedId} openType='getUserInfo' onGetUserInfo={this.getUserInfo} className='contact' >
            <Image className='phone' src={require('../../assets/images/smartphone@2x.png')} />
            <Text >联系求货</Text>
          </Button>
        </ScrollView>

      </View>
    );
  }
}

export default OutList;
