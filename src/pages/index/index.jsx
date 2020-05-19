import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text, Swiper, SwiperItem } from "@tarojs/components";
import { AtMessage } from "taro-ui";
import "./index.scss";
import api from "../../service/api";
class Index extends Component {
  config = {
    navigationBarTitleText: "GO球鞋仓库"
  };
  state = {

  };
  componentDidMount() {

  }


  render() {
    return (
      <View className="indexContent">
        <AtMessage />

      </View>
    );
  }
}

export default Index;
