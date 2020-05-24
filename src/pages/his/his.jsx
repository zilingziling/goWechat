import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text,Image,Input  } from "@tarojs/components";
import './his.scss'
import Goods from '../../components/goods'
import api from '../../service/api'
class His extends Component {
  config = {
    navigationBarTitleText: "TA的求货"
  };
  state = {
    data:[],
    type:'',
    userId:'',
    pageSize:10,
    pageIndex:1,
    total:'',
    img:'',
    userName:'',
    totalPages:'',
    accountState:''
  };
  componentDidMount() {
    let type=this.$router.params.type
    let userId=this.$router.params.userId
    let img=this.$router.params.img
    let userName=this.$router.params.userName
    let accountState=this.$router.params.accountState
    // 设置导航栏标题
    wx.setNavigationBarTitle({
      title:type==1? "TA的出货":"TA的求货"
    })
    this.setState({
      userId,
      type,img,userName,accountState
    },()=>this.init())
  }
  init=()=>{
    const {type,pageSize,pageIndex,userId}=this.state
    api.get('/v2/h5/taGroupHallList',{type,pageSize,pageIndex,userId}).then(r=>{
      if(r.data.code===0){
        this.setState({
          data:[...this.state.data,...r.data.data.list],
          total:r.data.data.total,
          totalPages:r.data.data.totalPages
        })
      }
    })
  }
  onReachBottom() {
    this.setState({
      pageIndex: ++this.state.pageIndex
    }, () => {
      if(this.state.pageIndex>this.state.totalPages){
        wx.showToast({
          title: '已达底部！',
          icon:'none'
        })
      }else {
        this.init()
      }

    })
  }
  render() {
  const {total,type,img,userName,data,accountState}=this.state
    return (
      <View className='hisWrap'>
        <View className='hisInfo'>
          <View className='info'>
            <Image  className='head' src={img}/>
            <View className='shop'>
              <Text className='name'>{userName}</Text>
              <Text className='shopType'>仓库类型 · {accountState==="mainAccount"?'主仓库':"子仓库"}</Text>
            </View>
          </View>
          <Image className='logo' src={require('../../assets/images/certification_big@2x.png')}/>
        </View>
        <View className='count'>
          <View className='divide'></View>
          <Text className='nums'>{type===1?'出':"求"}货数量 - {total}/双</Text>
          <View className='divide'></View>
        </View>
        {
          data.map(item=><Goods goodsInfo={item} fromHis={true}/>)
        }
      </View>
    );
  }
}

export default His;
