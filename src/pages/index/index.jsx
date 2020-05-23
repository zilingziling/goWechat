import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text,Image,Input  } from "@tarojs/components";
import { AtMessage,AtInput} from "taro-ui";
import "./index.scss";
import api from "../../service/api";
import Goods from '../../components/goods'
class Index extends Component {
  config = {
    navigationBarTitleText: "GO球鞋仓库"
  };
  state = {
    data:[1,2,3,4,5],
    showSearch:false
  };
  componentDidMount() {
    this.init()
  }
   init=()=>{
    api.get('/v2/supplyDemand/getOutPutSupplyDemand',{pageIndex:1,pageSize:10}).then(r=>{
      console.log(r)
    })
  }
  render() {
    const {data,showSearch} =this.state
    return (
      <View className="indexContent" style={showSearch?{height:'100vh',overflow:'hidden'}:null}>
        <AtMessage />
        {
          showSearch&&<View className='modalStyle'>
            <View className='modalContent'>
              <View className='topType'>
                <View className='searchType'>
                  <Text className='select selected'>求货</Text>
                  <Text className='select'>出货</Text>
                </View>
                <Image onClick={()=>this.setState({showSearch:false})} className='close' src={require('../../assets/images/delete@2x.png')}/>
              </View>
              <View className='search'>
                <Image src={require('../../assets/images/search.png')} className='searchIcon'/>
                {/*<Input placeholderClass='placeHolder' clear={true} placeholder='输入货号或名字'/>*/}
                <AtInput
                  className='input'
                  clear
                  placeholderClass='placeHolder'
                  border={false}
                  placeholder='输入货号或名字'
                />
              </View>
              <View className='listWrapper'>
                {
                  data.map(item=><Goods/>)
                }
              </View>
            </View>
          </View>
        }
         <View className='banner'>
            <Text className='title'>仓库服务开创者</Text>
            <Text className='info'>
              球鞋，服饰，箱包
              精准调货 快速准确
            </Text>
         </View>
        <View className='counts'>
          <View className='aData'>
            <View className='total'>
              <Text className='bold'>100,00</Text>
              <Text className='normal'>件</Text>
            </View>
            <Text className='explain'>累计交易次数达到</Text>
          </View>
          <View className='aData'>
            <View className='total'>
              <Text className='bold'>100,00</Text>
              <Text className='normal'>件</Text>
            </View>
            <Text className='explain'>求货总数</Text>
          </View>
          <View className='aData'>
            <View className='total'>
              <Text className='bold'>100,00</Text>
              <Text className='normal'>件</Text>
            </View>
            <Text className='explain'>出货总数</Text>
          </View>

        </View>
        <View className='search'>
          <Image src={require('../../assets/images/search.png')} className='searchIcon'/>
          {/*<Input placeholderClass='placeHolder' clear={true} placeholder='输入货号或名字'/>*/}
          <AtInput
            className='input'
            clear
            placeholderClass='placeHolder'
            border={false}
            placeholder='输入货号或名字'
          />
        </View>
        <View className='type'>
          <View className='btn clicked'>求货</View>
          <View className='btn'>出货</View>
        </View>
        {
          data.map(item=><Goods/>)
        }
      </View>
    );
  }
}

export default Index;
