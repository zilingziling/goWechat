import Taro, { Component } from "@tarojs/taro";
import './bigSize.scss'
class BigSize extends Component{
  static defaultProps = {
    size: {
      size:''
    },
    clickedSize:''
  }
  chooseSize=(size)=>{
    this.props.onClick(size)
    // this.setState({
    //   clickedSize:size
    // })
  }
  render(){
    const {size}=this.props
    const {clickedSize}=this.state
    return (
      <View onClick={()=>this.chooseSize(size.size)} className={`bigSize ${size.checked?'clicked':''}`} >
        <Text className='size' style={{fontSize:size.size.length>=3?'12px':'24px'}}>{size.size}</Text>
        {
          size.sizeCount&&<Text className='person'>{size.sizeCount}人</Text>
        }
      </View>
    )
  }
}

export default BigSize
