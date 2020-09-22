import React, { Component } from 'react';
import {TouchableOpacity,TextInput, Text, View, Dimensions, Modal, ScrollView} from 'react-native';
import { Icon, Container, Header } from 'native-base'; 
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import DetailSection from './DetailSection.js'
import ImgComponet from './WriteModalImage';
import ConvModal from './DetailModal/ConvenienceModal.js'
import SellBuyCategoryModal from './DetailModal/SellBuyModal.js'
import DetailSettingModal from './DetailModal/DetailSettingModal.js'
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
        detailModalShown: false,
        sellBuyModalShown: false,
        SettingInfoVisible: false,
        title:'',
        category:'카테고리',
        sellbuy:null,
        imageArray: [],
        lst:[],
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
    } catch (E) {}
  }; 
  /* ########## 편의 시설 모달 함수 ########## */
  selectionConv=(text)=>{
    if(!this.state.lst.includes(text)){
      this.state.lst.push(text)
    }
    else{
      let idx = this.state.lst.indexOf(text)
      this.state.lst.splice(idx, 1)
    }
  }
  convModalToggle(){
    this.setState({convModalShown: !this.state.convModalShown})
  }
  convModal=()=>{  
    return(
      <Modal animationType="fade" transparent={true} visible={this.state.convModalShown} 
      onRequestClose={() => {this.convModalToggle();}} backdrop={true}>
        <ConvModal toggle={()=>this.convModalToggle()} conv={this.selectionConv}/>
      </Modal>
    )
  }
  /* ########## 세부 시설 모달 함수 ########## */
  detailModalToggle() {
    this.setState({detailModalShown: !this.state.detailModalShown});
  }
  detailModal=()=>{
    return (
      <Modal animationType="slide" transparent={false} visible={this.state.detailModalShown}
        onRequestClose={() => {this.detailModalToggle();}} backdrop={true}>
        <DetailSettingModal toggle={()=>this.detailModalToggle()} />
      </Modal>
    )
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
        <SellBuyCategoryModal categoryBuyChanger={()=>this.categoryBuyChanger()} categorySellChanger={()=> this.categorySellChanger()}
          buyClicker = {()=>this.buyClicker()} sellClicker = {()=>this.sellClicker()} />
      </Modal>
    )
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
            <View style={{flexDirection:'row', margin:10}}>
              <Text style={{fontSize:20, fontWeight:'bold'}}> 방 내놓기 </Text>
            </View>
            <ScrollView style={{margin:10}} horizontal={true} /* 이미지 미리보기 */>
              {
                imageArray.length > 0?
                imageArray.map((e, index)=>(
                  <ImgComponet data={e} key={index}/>
                ))
                :<Text>이미지를 업로드 하세요!</Text>
              }
            </ScrollView>
            {this.sellBuyCategoryModal() /* 방 구하기, 팔기 대분류 모달 */}
            {this.detailModal() /* 세부 사항 모달 */}
            {this.convModal()/* 편의 시설 모달 함수 */} 
            <View style={{alignItems:'center'}}>
              
              <TouchableOpacity style={styles.button} onPress={()=>this.sellBuyModalToggle()}>
                <Text style={{margin:5}}>{this.state.category}</Text>
                <Text style={{margin:5}}> &gt; </Text>
              </TouchableOpacity>
              <DetailSection detailToggle={()=>this.detailModalToggle()} convToggle={()=>this.convModalToggle()}
                sellbuy={this.state.sellbuy} lst={this.state.lst} /* 세부사항, 편의시설 컴포넌트 분리 *//>
              <TextInput
                style={styles.button}  
                placeholder="제목" onChangeText={(title) => this.setState({title})} value={this.state.title}>  
              </TextInput>
              <View style={{margin:5, width:'100%', alignItems:'center'}}>
                <TextInput 
                  style={styles.mcontent} placeholder="게시글을 작성해주세요." >
                  
                </TextInput>
                {imageArray.length < 5 ? /* 이미지 선택 (5장 까지 가능하도록 구현) */
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