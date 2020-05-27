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
    let aboutUser=wx.getStorageSync('aboutUser')
    if (e.detail.errMsg == "getPhoneNumber:ok"){
      console.log(e.detail)
      api.get('/v2/h5/deciphering',{
        encryptedData:e.detail.encryptedData,
        iv: e.detail.iv,
        sessionKey:userInfo.sessionKey
      }).then(response=>{
        if(response.data.code===0){
          console.log(response.data.data.phoneNumber,userInfo.unoinId)
              // 注册
              api.get('/v2/h5/appletRegister',{
                wxNum:this.state.wxNum,
                phoneNum:response.data.data,
                img:aboutUser.avatarUrl ,
                unoinId:userInfo.unionid,
              }).then(r=>{
                if(r.data.code===0){
                  wx.showToast({
                    title: '注册成功！'
                  })
                }else {
                  wx.showToast({
                    title: '服务器错误！',
                    icon:'none'
                  })
                }
                wx.setStorageSync('token', r.data.data.token);
                Taro.navigateBack({
                  delta: 1 // 返回上一级页面。
                });
              })
        }else {
          wx.showToast({
            title: '服务器错误！',
            icon:'none'
          })
        }
      })
    }
  }
  render() {
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
