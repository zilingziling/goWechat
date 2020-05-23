import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text,Image,Input  } from "@tarojs/components";
import { AtMessage,AtInput} from "taro-ui";

import './login.scss'
class Login extends Component {
  config = {
    navigationBarTitleText: "补充信息"
  };
  state = {
  };
  componentDidMount() {

  }
  render() {
    return (
      <View className='loginWrap' >
        <Text className='h1'>补充信息</Text>
        <View className='loginForm'>
          <Text>微信号</Text>
          <AtInput
            className='input'
            clear
            placeholderClass='placeHolder'
            border={false}
            placeholder='like-six-ss'
          />
          <Image className='ask' src={require('../../assets/images/help@2x.png')} />
        </View>
        <View className='confirm'>
          提交
        </View>
      </View>
    );
  }
}

export default Login;
