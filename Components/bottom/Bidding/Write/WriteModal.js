import React, { Component } from 'react';
import {Image,touchablehilight,TouchableWithoutFeedback,TouchableOpacity,TextInput, 
  StyleSheet, Text, View, Dimensions, Modal, TouchableHighlight, ScrollView} from 'react-native';
import { Icon, Container, Header, Button, CheckBox, } from 'native-base'; 
import SettingInfo from '../Setting/Setting'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import ImgComponet from './WriteModalImage';
import ConvModal from './DetailModal/ConvenienceModal.js'
import SellBuyCategoryModal from './DetailModal/SellBuyModal.js'
import styles from '../../../css/bottom/Bidding/WriteModalCSS.js' 

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH );
const ITEM_WIDTH1 = Math.round(SLIDER_WIDTH);

export default class WriteModal extends Component {


    constructor(props) {  
      super(props);  
      this.state = {
        convModalShown: false,
        modalShown: false,
        sellBuyModalShown: false,
        SettingInfoVisible: false,
        title:'',
        category:'카테고리',
        activeIndex:1,
        secondIndex:1,
        thirdIndex:1,
        sellbuy:null,
        imageArray: [],
      };  
  }
  componentDidMount() {
    this.getPermissionAsync();
  }
  getPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('카메라 권한이 없습니다.');
      }
    }
  };
  noUpdate = () => {
    alert('5장까지 업로드 가능합니다!')
  }

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        
        let lst = this.state.imageArray
        lst.push(result.uri)
        this.setState({imageArray:lst})
      }
    } catch (E) {
      //console.log(E);
    }
  }; 

sellbuyClicked = (sellbuy) => {
  this.setState({ 
    sellbuy 
  });
  
}  
segmentClicked = (activeIndex) => {
  this.setState({ 
    activeIndex 
  });
  
}
SecondClicked = (secondIndex) => {
  this.setState({ 
    secondIndex 
  });
  
}
ThirdClicked = (thirdIndex) => {
  this.setState({ 
    thirdIndex 
  });
  
}
renderSection=()=>{
   if(this.state.activeIndex === 0){
    return(
        <View style={{width:'100%', flexDirection:'row'}}>
          <View style={{width:'50%'}}>
            <View style={{flexDirection:'row'}}><CheckBox/><Text>     단독주택</Text></View>
            <View style={{flexDirection:'row'}}><CheckBox></CheckBox><Text>     다가구주택</Text></View>
          </View>
          <View style={{width:'50%'}}>
            <View style={{flexDirection:'row'}}><CheckBox/><Text>     다가구주택</Text></View>
            <View style={{flexDirection:'row'}}><CheckBox></CheckBox><Text>     상가주택</Text></View>
          </View>
        </View>
    )
  }
}
DetailSection=()=>{
  if(this.state.sellbuy === 1){
    return(
      <TouchableOpacity style={styles.button} onPress={()=>this.setModalShown(true)}>
        <Text style={{margin:5}}>세부정보</Text>
        <Text style={{margin:5}}> &lt; </Text>
      </TouchableOpacity>
    )
    }  
  else if(this.state.sellbuy === 0){
    return(
      <TouchableOpacity style={styles.button} onPress={()=>this.convModalToggle()}>
        <Text style={{margin:5}}>편의시설</Text>
        <Text style={{margin:5}}> &gt; </Text>
      </TouchableOpacity>
    )  
  }
}
SecondSection=()=>{
  if(this.state.secondIndex === 0){
   return(
       <View style={{width:'100%', flexDirection:'row'}}>
         <View style={{width:'50%'}}>
           <View style={{flexDirection:'row'}}><CheckBox/><Text>     단독주택</Text></View>
           <View style={{flexDirection:'row'}}><CheckBox></CheckBox><Text>     다가구주택</Text></View>
         </View>
         <View style={{width:'50%'}}>
           <View style={{flexDirection:'row'}}><CheckBox/><Text>     다가구주택</Text></View>
           <View style={{flexDirection:'row'}}><CheckBox></CheckBox><Text>     상가주택</Text></View>
         </View>
       </View>
   )
 }
}
ThirdSection=()=>{
  if(this.state.thirdIndex === 0){
   return(
       <View style={{width:'100%', flexDirection:'row'}}>
         <View style={{width:'50%'}}>
           <View style={{flexDirection:'row'}}><CheckBox/><Text>     단독주택</Text></View>
           <View style={{flexDirection:'row'}}><CheckBox></CheckBox><Text>     다가구주택</Text></View>
         </View>
         <View style={{width:'50%'}}>
           <View style={{flexDirection:'row'}}><CheckBox/><Text>     다가구주택</Text></View>
           <View style={{flexDirection:'row'}}><CheckBox></CheckBox><Text>     상가주택</Text></View>
         </View>
       </View>
   )
 }
}


  
setModalShown(visible) {
  this.setState({modalShown: visible});
}
convModalToggle(){
  this.setState({convModalShown: !this.state.convModalShown})
}
convModal=()=>{  // 편의 시설 모달 함수
  return(
    <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.convModalShown}
        onRequestClose={() => {
          this.convModalToggle();
        }}
        backdrop={true}
        >
      <ConvModal toggle={()=>this.convModalToggle()}/>
    </Modal>
  )
}
Settingmodal=()=>{
  return <Modal
  animationType="slide"
  transparent={false}
  visible={this.state.modalShown}
  onRequestClose={() => {
    this.setModalShown(!this.state.modalShown);
  }}
  backdrop={true}
  >
    <View style={{flex:1}}>
      <Header style ={{justifyContent:'space-between'}}>
        
        <Icon name='ios-arrow-back' onPress={()=>{this.setModalShown(!this.state.modalShown);}}/>
        <Text>세부 정보</Text>
        <Text/>
      </Header>
      <View style={{flexDirection:'column', alignItems:'center'}}>
        <TouchableOpacity style={{width:'100%',height:50,flexDirection:'row',justifyContent:'space-between',alignItems: 'center',borderWidth:0.5,borderColor:'#a7a7a7',backgroundColor:'whitesmoke'}}
          onPress={() => {
            this.state.activeIndex === 1 ? this.segmentClicked(0) : this.segmentClicked(1);
            this.setState.press=true;
            } }>
          <View style={{flexDirection:'row'}}>
            <Text>  </Text>
            <Icon name='md-square-outline' />
            <Text style={{margin:5}}>주택</Text>
          </View>
          <Icon name='ios-arrow-down' style={{margin:5}}/>
        </TouchableOpacity>
        {this.renderSection()}
        <TouchableOpacity style={{width:'100%', height:50, flexDirection:'row', justifyContent:'space-between', alignItems: 'center', borderWidth:0.5, borderColor:'#a7a7a7', backgroundColor:'whitesmoke'}}
        onPress={() => this.state.secondIndex === 1 ? this.SecondClicked(0) : this.SecondClicked(1)}>
          <View style={{flexDirection:'row'}}>
            <Text>  </Text>
            <Icon name='ios-watch'/>
            <Text style={{margin:5}}>오피스텔</Text>
          </View>
          <Icon name='ios-arrow-down' style={{margin:5}}/>
        </TouchableOpacity>
        {this.SecondSection()}
        <TouchableOpacity style={{width:'100%', height:50, flexDirection:'row', justifyContent:'space-between', alignItems: 'center', borderWidth:0.5, borderColor:'#a7a7a7', backgroundColor:'whitesmoke'}}
        onPress={() => this.state.thirdIndex === 1 ? this.ThirdClicked(0) : this.ThirdClicked(1)}>
          <View style={{flexDirection:'row'}}>
            <Text>  </Text>
            <Icon name='md-browsers'/>
            <Text style={{margin:5}}>아파트</Text>
          </View>
          <Icon name='ios-arrow-down' style={{margin:5}}/>
        </TouchableOpacity>
        {this.ThirdSection()}
      </View>
      <View style={{flex:1,flexDirection:'column',justifyContent:'flex-end',alignItems:'center'}}>
        <TouchableOpacity style={{width:'100%',height:50, backgroundColor:'#004aff', justifyContent:'center', alignItems:'center' }} onPress={()=>this.SettingInfoVisible1()}>
          <Text style={{fontSize:20, color:'white'}}>다음</Text>
        </TouchableOpacity>
      </View>
    </View>
    {this.SettingInfoModal()}
  </Modal>

  }


  SettingInfoVisible1() {
    this.setState({SettingInfoVisible:!this.state.SettingInfoVisible});
  }
  SettingInfoModal=()=>{
    return <Modal
    animationType="slide"
    transparent={false}
    visible={this.state.SettingInfoVisible}
    onRequestClose={() => {
      this.SettingInfoVisible1();
    }}
    backdrop={true}
    >
      <SettingInfo SettingInfoVisible1={()=>this.SettingInfoVisible1()}/>
    </Modal>

  }

  /* ########## 방 구하기 / 방 내놓기 모달  ########## */
  sellBuyModalToggle() {
    this.setState({sellBuyModalShown: !this.state.sellBuyModalShown});
  }
  categoryBuyChanger=()=>{
    this.setState({category: '방 구하기'}) 
  }
  categorySellChanger=()=>{
    this.setState({category: '방 내놓기'}) 
  }
  buyClicker=()=>{
    this.setState({sellbuy:0})
    this.sellBuyModalToggle()
  }
  sellClicker=()=>{
    this.setState({sellbuy:1})
    this.sellBuyModalToggle()
  }
  sellBuyCategoryModal =() =>{
    return( 
      <Modal animationType="fade" transparent={true} visible={this.state.sellBuyModalShown}
        onRequestClose={() => {this.sellBuyModalToggle();}} backdrop={true}>
        <SellBuyCategoryModal 
        //toggle={()=>this.sellBuyModalToggle()} 
        categoryBuyChanger={()=>this.categoryBuyChanger()}
        categorySellChanger={()=> this.categorySellChanger()}
        buyClicker = {()=>this.buyClicker()}
        sellClicker = {()=>this.sellClicker()} />
      </Modal>
    )
  }
  updateText = () => {
    this.setState({myText: 'My Changed Text'})
 }
 /* ########## main  ########## */ 
  render() {
      let { imageArray } = this.state // 이미지 배열 지역변수
      return (
        <Container style={styles.container}>
          <ScrollView>
            <Header style={styles.modalheader}>    
              <TouchableOpacity onPress={this.props.toggle}>
                <Text>X</Text>
              </TouchableOpacity> 
              <Text style={{fontSize:15 }}>
                게시판 글쓰기
              </Text>
              <Text></Text>           
            </Header>
            <ScrollView horizontal={true}>
              {
                imageArray.length > 0?
                imageArray.map((e, index)=>(
                  <ImgComponet data={e} key={index}/>
                ))
                :<Text>이미지를 업로드 하세요!</Text>
              }
            </ScrollView>
            {this.sellBuyCategoryModal() /* 방 구하기, 팔기 대분류 모달 */}
            {this.Settingmodal()}
            {this.convModal()/* 편의 시설 모달 함수 */} 
            <View style={{alignItems:'center'}}>
              
              <TouchableOpacity style={styles.button} onPress={()=>this.sellBuyModalToggle()}>
                <Text style={{margin:5}}>{this.state.category}</Text>
                <Text style={{margin:5}}> &gt; </Text>
              </TouchableOpacity>
              {this.DetailSection()}
              <TextInput
                style={styles.button}  
                placeholder="제목" onChangeText={(title) => this.setState({title})} value={this.state.title}>  
              </TextInput>
              <View style={{margin:5, width:'100%', alignItems:'center'}}>
                <TextInput 
                  style={styles.mcontent} placeholder="게시글을 작성해주세요." >
                  
                </TextInput>
                {imageArray.length < 5 ?
                <TouchableOpacity style={styles.bottomimage} onPress={this._pickImage} >
                  <View style={{flexDirection:'row'}}>
                    <Icon name='md-image' style={{margin:5, color:'#FF5C3B'}}/>
                    <Text style={{margin:5, color:'#FF5C3B'}}>사진 추가하기</Text>
                  </View>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.bottomimage} onPress={this.noUpdate} >
                  <View style={{flexDirection:'row'}}>
                    <Icon name='md-image' style={{margin:5, color:'#004aff'}}/>
                    <Text style={{margin:5, color:'#004aff'}}>사진 추가하기</Text>
                  </View>
                </TouchableOpacity>
                }
                  
                
                
              </View> 
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={styles.bottombutton} onPress={this.props.toggle}> 
                  <Text>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottombutton1}>
                  <Text style={{color:'white'}}>작성하기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Container >
              
      );
  }
}
const Buttton = ({ onPress, children }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{children}</Text>
  </TouchableOpacity>
);