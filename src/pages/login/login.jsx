import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text,Image,Input  } from "@tarojs/components";
import { AtMessage,AtInput} from "taro-ui";
import api from '../../service/api'
import './login.scss'
class Login extends Component {
  config = {
    navigationBarTitleText: "补充信息"
  };
  state = {
    wxNum:''
  };
  componentDidMount() {

  }
  setInput=v=>{
    this.setState({
      wxNum:v
    })
  }
  getPhoneNumber=(e)=>{
    console.log(111)
    let userInfo=wx.getStorageSync('userInfo');
    if (e.detail.errMsg == "getPhoneNumber:ok"){
      console.log(e.detail)
    }

    // wx.getUserInfo({
    //   success: function (res) {
    //     // that.setData({
    //     //   nickName: res.userInfo.nickName,
    //     //   avatarUrl: res.userInfo.avatarUrl,
    //     // })
    //     api.post('/v2/h5/appletRegister',{
    //       wxNum:this.state.wxNum,
    //       phoneNum:userInfo.phoneNum,
    //       img:res.userInfo.avatarUrl ,
    //       unoinId:userInfo.unoinId,
    //     }).then(r=>{
    //       if(r.data.code===0){
    //         wx.showToast({
    //           title: '注册成功！'
    //         })
    //       }
    //       wx.setStorageSync('token', r.data.data.token);
    //     })
    //   },
    // })


  }
  render() {
    console.log(this.state.wxNum)
    return (
      <View className='loginWrap' >
        <Text className='h1'>补充信息</Text>
        <View className='loginForm'>
          <Text>微信号</Text>
          <AtInput
            onChange={this.setInput}
            className='input'
            clear
            placeholderClass='placeHolder'
            border={false}
            placeholder='like-six-ss'
          />
          <Image className='ask' src={require('../../assets/images/help@2x.png')} />
        </View>
        <Button disabled={!this.state.wxNum} className='confirm' openType="getPhoneNumber" onGetPhoneNumber={this.getPhoneNumber} >
          提交
        </Button>
      </View>
    );
  }
}

export default Login;
