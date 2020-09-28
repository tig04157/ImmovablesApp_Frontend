import React, { Component } from 'react';
import Modal from "react-native-modal";
import {TouchableWithoutFeedback,TouchableOpacity,TextInput, StyleSheet, Text, View, Dimensions, TouchableHighlight, ScrollView} from 'react-native';
import { Icon, Container, Header, } from 'native-base'; 
import DoBidding from './BiddingActiveModal/DoBidding'
import styles from '../../css/bottom/Bidding/DetailPostModalCSS'
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4)

export default class DetailPostModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible : false,
      data : props.toData,
      toggle : props.toggle,
      chkheart:0,
      isModalVisible: false,
    };
  }

  toggle(){
    this.setState({isModalVisible:!this.state.isModalVisible});
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  setHeart(){
    if(this.state.chkheart===0)
      this.setState({chkheart:1})
    else if(this.state.chkheart===1)
      this.setState({chkheart:0})
  }

  render() {
    return (
      <Container style={styles.container}>
        <Modal isVisible={this.state.isModalVisible}>
          <DoBidding toggle3={() => this.toggle()}/>
        </Modal>
        <Header style={styles.header}>
          <Icon 
            name='ios-close'
            style={{fontSize: 50, color: 'black', position: 'absolute', left: 15}}
            onPress={this.props.toggle2}
          />
          <Text> 
            {this.state.data.title} 
          </Text>   
        </Header>
        <ScrollView style={{height:'80%'}}>
          {/*사진 View*/}
          <View style={styles.img}>
            <View>
              <View style={styles.heartback}>
                <TouchableOpacity 
                style={this.state.chkheart===1? styles.heartradiuson : styles.heartradiusoff}
                onPress={()=>this.setHeart()}
                >
                  <Icon name="md-heart" 
                    style={this.state.chkheart===1?styles.heartbuttonon:styles.heartbuttonoff}
                  >
                  </Icon>
                </TouchableOpacity>
              </View>
            </View>
            <View style ={{flex:1,justifyContent:'center', alignItems:'center'}}>
              <Text style={{margin:15}}>사진</Text>        
            </View>
          </View>
          <View style={{backgroundColor: 'white'}}>
            <View style={styles.hr}/>
          </View>          
          {/* 가격 뷰 // DB에 전,월세 저장 */}
          <View style={styles.price}>
            <Text style={{fontSize:25}}>월세: {this.state.data.price/10000}(만원)</Text>
          </View>                 
          {/*설명*/}
          <View style={styles.content}>
            <Text>{this.state.data.content}</Text>
          </View>
          <View style={{backgroundColor: 'white'}}>
            <View style={styles.hr}/>
          </View> 
          {/*부동산*/}
          <View style={styles.category}>
            <View style={styles.info}>
              <Text>{this.state.data.author}</Text>
            </View>
          </View>
          <View style={{backgroundColor: 'white'}}>
            <View style={styles.hr}/>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.biddingbutton} onPress={()=>{this.toggle()}}>
          <Text style={styles.biddingfont}>입찰하기</Text>
        </TouchableOpacity>
      </Container>
    );
  }
}
