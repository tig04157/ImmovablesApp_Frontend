import React, { Component } from 'react';
import { TouchableOpacity,TextInput, StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { Icon, Container, Header, Button } from 'native-base'; 
import RowCardComponent  from './RowCardComponent'; 
import http from "../../../http-common";
import Loading from "./BiddingAlgorithm/Loading"
//import {get1} from './BiddingAlgorithm/BiddingGetDB'
//import PurchaseHope from "./BiddingAlgorithm/PurchaseHope"
// import DetailPostModal from './DetailPostModal'
import BoardHeader from './BiddingAlgorithm/BoardHeader'
import styles from '../../css/bottom/Bidding/BoardCSS.js'

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
//const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

export default class Board extends Component { 

  constructor(props) {  
    super(props);       
    this.state = {
      DBdata1: null, // 중개를 원해요 
      DBdata2: null, // 구매 희망 게시판 데이터
      activeIndex: 0,
      activeIndex2: 3,
      loading: true,
      searchInfo: '',
      isModalVisible: false
    };  
  }    

  //로딩 구현(Life cycle (constructor-> static getDerivedStateFromProps() -> render() -> ))
  componentDidMount(){
    this.getDB()
    this.getDB2()
    setTimeout(()=>{
      this.setState({
        loading:false
      })
    }, 3000)
  }

  static navigationOptions = {
      tabBarIcon: ({tintColor}) => (
          <Icon name='ios-create' style={{color: tintColor}}/>
      )
  }
  
  reloading(){
    this.getDB()
    this.getDB2()
  }

  segmentClicked = (activeIndex)=>{
    this.setState({activeIndex});
  }

  segmentClicked2 = (activeIndex2)=>{
    this.setState({activeIndex2});
  }

  getDB(){
    http.get(`/board/getPost`)
    .then(response => {
      this.setState({DBdata1:response.data})
    })
    .catch(error => {
      console.log(error); 
    })
  }

  getDB2(){
    http.get(`/board/getPost2`)
    .then(response => {
      this.setState({DBdata2: response.data})
    })
    .catch(error => {
      console.log(error);
    })
  }

  renderSection() {  
    if(this.state.DBdata2 != null){
      if(this.state.activeIndex === 0){
        return (    
          this.state.DBdata1.reverse().map((feed, index) => (
            <RowCardComponent data={ feed } key={index}/>
          ))  
        )            
      }
      else if(this.state.activeIndex === 1){
        
        return (    
          <View>
            <View style={styles.category}>
              <TouchableOpacity style={[ this.state.activeIndex === 0 ? {height:40,borderBottomWidth:2} :{height:40}], { padding: 15, backgroundColor:'string', flexDirection: 'row'}}
                onPress={() => this.segmentClicked2(3)}
                active={this.state.activeIndex2 === 3}>
                <Text style={[ this.state.activeIndex2 === 3 ? {} : {color: 'grey'} ]}>중개를 원해요!</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[ this.state.activeIndex === 1 ? {height:40, borderBottomWidth:2} :{height:40}], { padding: 15, backgroundColor:'string', flexDirection: 'row'}}
                onPress={() => this.segmentClicked2(4)}
                active={this.state.activeIndex2 === 4}>
                <Text style={ [ this.state.activeIndex2 === 4 ? {} : {color: 'grey'} ]}>거래를 원해요!</Text>
              </TouchableOpacity>
              
            </View>
            {
                this.state.DBdata2.map((feed, index) => (
                  <RowCardComponent data={ feed } key={index}/>
                ))
              } 
          </View>
        )
      }
    }else{
      this.reloading() // 연속적 로딩 기능 구현 해야함
      return(
      <Text>로딩에 실패하였습니다.</Text>
      )
    }
  }
  
  //Main Render @@구매 & 거래
  render() {
    if(this.state.loading){
      return(        
        <Loading/>
      )
    }else{
      return (        
        <Container style={styles.container}>         
          <BoardHeader reloader={()=>this.reloading()}/>     
          <View style={styles.category}>
            <TouchableOpacity style={[ this.state.activeIndex === 0 ? {height:40,borderBottomWidth:2} :{height:40}], { padding: 15, backgroundColor:'string', flexDirection: 'row'}}
              onPress={() => this.segmentClicked(0)}
              active={this.state.activeIndex === 0}>
              <Text style={[ this.state.activeIndex === 0 ? {} : {color: 'grey'} ]}>구매 희망 게시판</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[ this.state.activeIndex === 1 ? {height:40, borderBottomWidth:2} :{height:40}], { padding: 15, backgroundColor:'string', flexDirection: 'row'}}
              onPress={() => this.segmentClicked(1)}
              active={this.state.activeIndex === 1}>
              <Text style={ [ this.state.activeIndex === 1 ? {} : {color: 'grey'} ]}>거래 게시판</Text>
            </TouchableOpacity>
          </View> 
          <ScrollView>                                             
          {                               
           this.renderSection() 
          }
          </ScrollView>
        </Container>
      );
    }
  }
}