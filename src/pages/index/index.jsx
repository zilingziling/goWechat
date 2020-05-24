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
    data:[],
    showSearch:false,
    type:1,
    pageIndex:1,
    countInfo:{},

  };
  componentDidMount() {
    this.init()
  //   获取统计信息
    api.get('/v2/h5/getStatisticsCountHall').then(r=>{
      if(r.data.code===0){
        this.setState({
          countInfo: r.data.data
        })
      }
    })
  }
   init=()=>{
    const {type,pageIndex}=this.state
    api.get('/v2/h5/supplyDemandHall',{pageIndex,pageSize:10,type}).then(r=>{
      if(r.data.code===0){
        this.setState({
          data:[...this.state.data,...r.data.data.list]
        })
      }
    })
  }
  chooseType=type=>{
    this.setState({
      type,
      pageIndex:1,
      data:[]
    },()=>{
      this.init()

    })

  }
  onReachBottom(){
    this.setState({
        pageIndex:++this.state.pageIndex
    },()=>{
      this.init()
    })
  }
  // 搜索
  onClickSearch=()=>{
    this.setState({
      showSearch:true,
      data:[],
      pageIndex:1,
      type:0
    })
  }
  onCloseSearch=()=>{
    this.setState({
      showSearch:false,
      data:[],
      pageIndex:1,
      type:1
    })
  }

  render() {
    const {data,showSearch,countInfo} =this.state
    return (
      <View  className="indexContent" style={showSearch?{height:'100vh',overflow:'hidden'}:null}>
        <AtMessage />
        {
          showSearch&&<View className='modalStyle'>
            <View className='modalContent'>
              <View className='topType'>
                <View className='searchType'>
                  <Text className='select selected'>求货</Text>
                  <Text className='select'>出货</Text>
                </View>
                <Image onClick={this.onCloseSearch} className='close' src={require('../../assets/images/delete@2x.png')}/>
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
                  data.map(goods=>{
                  })
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
              <Text className='bold'>{countInfo.totalCount}</Text>
              <Text className='normal'>件</Text>
            </View>
            <Text className='explain'>累计交易次数达到</Text>
          </View>
          <View className='aData'>
            <View className='total'>
              <Text className='bold'>{countInfo.myDemandNum}</Text>
              <Text className='normal'>件</Text>
            </View>
            <Text className='explain'>求货总数</Text>
          </View>
          <View className='aData'>
            <View className='total'>
              <Text className='bold'>{countInfo.mySupplyNum}</Text>
              <Text className='normal'>件</Text>
            </View>
            <Text className='explain'>出货总数</Text>
          </View>

        </View>
        <View className='search' onClick={this.onClickSearch}>
          <Image src={require('../../assets/images/search.png')} className='searchIcon'/>
          {/*<Input placeholderClass='placeHolder' clear={true} placeholder='输入货号或名字'/>*/}
          <AtInput
            disabled
            className='input'
            clear
            placeholderClass='placeHolder'
            border={false}
            placeholder='输入货号或名字'
          />
        </View>
        <View className='type'>
          <View className={`btn ${this.state.type===0?'clicked':''}`} onClick={()=>this.chooseType(0)}>求货</View>
          <View className={`btn ${this.state.type===1?'clicked':''}`} onClick={()=>this.chooseType(1)}>出货</View>
        </View>
        {
          data.map(item=><Goods goodsInfo={{...item,type:this.state.type}} key={item.id}/>)
        }
      </View>
    );
  }
}

export default Index;
