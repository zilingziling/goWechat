import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text,Image,Input ,ScrollView } from "@tarojs/components";
import { AtMessage,AtInput} from "taro-ui";
import "./index.scss";
import api from "../../service/api";
import Goods from '../../components/goods'
import CountUp from 'react-countup'
import {toThousands} from '../../utils/func'
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
    totalPages:'',
    shoeNum:'' , // 搜索字段
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
    const {type,pageIndex,shoeNum}=this.state
    api.get('/v2/h5/supplyDemandHall',{pageIndex,pageSize:10,type,shoeNum}).then(r=>{
      if(r.data.code===0){
        this.setState({
          data:[...this.state.data,...r.data.data.list],
          totalPages:r.data.data.totalPages
        })
      }
    })
  }
  chooseType=(type,isSearch)=>{
    this.setState({
      type,
      pageIndex:1,
      data:[]
    },()=>{
      if(!isSearch){
        this.init()
      }
    })
  }
  onReachBottom(){
    this.loadMore()
  }
  loadMore=()=>{
    this.setState({
      pageIndex:++this.state.pageIndex
    },()=>{
      if(this.state.pageIndex>this.state.totalPages){
        wx.showToast({
          title: '已加载全部！',
          icon:'none'
        })
      }else {
        this.init()
      }
    })
  }
  // 搜索
  onClickSearch=()=>{
    this.setState({
      showSearch:true,
      data:[],
      pageIndex:1,
      type:0,
      shoeNum:''
    })
  }
  onCloseSearch=()=>{
    this.setState({
      showSearch:false,
      data:[],
      pageIndex:1,
      type:1,
      shoeNum:''
    },()=>this.init())
  }
  onInputSearch=value=>{
    this.setState({
      shoeNum:value
    })
  }
  onSearch=()=>{
        this.init()
  }
  scroll=()=>{
    this.loadMore()
  }
  onClear=()=>{
    this.setState({
      pageIndex:1,
      data:[],
      shoeNum:''
    })
  }
  getNumbers=(num)=>{
    if(num.length>5){
        
    }else {
        return toThousands(num)
    }
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
                  <Text className={`select ${this.state.type===0?'selected':''}`} onClick={()=>this.chooseType(0,true)}>求货</Text>
                  <Text className={`select ${this.state.type===1?'selected':''}`} onClick={()=>this.chooseType(1,true)}>出货</Text>
                </View>
                <Image onClick={this.onCloseSearch} className='close' src={require('../../assets/images/delete@2x.png')}/>
              </View>
              <View className='search'>
                <Image onClick={this.onSearch} src={require('../../assets/images/search.png')} className='searchIcon'/>
                {/*<Input placeholderClass='placeHolder' clear={true} placeholder='输入货号或名字'/>*/}
                <AtInput
                  onChange={this.onInputSearch}
                  className='input'
                  type='text'
                  placeholderClass='placeHolder'
                  border={false}
                  placeholder='输入货号或名字'
                  value={this.state.shoeNum}
                />
                {
                  this.state.shoeNum&&<Image onClick={this.onClear} className='clear' src={require('../../assets/images/clear.png')} />
                }

              </View>
              <ScrollView
                scrollY
                scrollWithAnimation
                onScrollToLower={this.scroll}
                className='listWrapper'>
                {
                  data.map(item=><Goods goodsInfo={{...item,type:this.state.type}} key={item.id}/>)
                }
              </ScrollView>
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
              <Text className='bold'>{countInfo.totalCount&&toThousands(countInfo.totalCount)}</Text>
              {/*<CountUp end={countInfo.totalCount} />*/}
              <Text className='normal'>件</Text>
            </View>
            <Text className='explain'>累计交易次数达到</Text>
          </View>
          <View className='aData'>
            <View className='total'>
              <Text className='bold'>{countInfo.myDemandNum&&toThousands(countInfo.myDemandNum)}</Text>
              <Text className='normal'>件</Text>
            </View>
            <Text className='explain'>求货总数</Text>
          </View>
          <View className='aData'>
            <View className='total'>
              <Text className='bold'>{countInfo.mySupplyNum&&toThousands(countInfo.mySupplyNum)}</Text>
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
