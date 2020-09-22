import React, { Component } from 'react';
import Modal from "react-native-modal";
import { View, Image, Text, StyleSheet } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import DetailPostModal from './Write/DetailPostModal'

export default class RawCardComponent extends Component {

    constructor(props){
      super(props);
      this.state = {
        isModalVisible: false
      };  
    }
      
    toggle(){
      this.setState({isModalVisible: !this.state.isModalVisible});
    }

    render() {
      const { data } = this.props; // 피드 항목 데이터
      //const { image } = JSON.parse(data.json_metadata); // json_metadata에서 이미지 url을 파싱
      return (
        <Card>
            <Modal isVisible={this.state.isModalVisible}>
              <DetailPostModal toggle2={() => this.toggle()} toData={data}/>
            </Modal>
            <TouchableOpacity onPress={() => this.toggle()}>
              <CardItem>
                  <Body style={{flex: 1.5, flexDirection: 'column',  alignItems:'flex-start'}}>
                    <Text style = {{ fontWeight:'900'}}>[{data.author}]</Text>
                    <Text note>{
                    data.title
                    //new Date(data.created).toDateString()
                    }</Text>
                    <Text style={{color:'#FC510C'}}> 
                      월세 {String(data.price).replace(/\n/g,' ').slice(0, 15)/10000 }(만원)
                    </Text> 

                    {     
                        (data.content.replace(/\n/g,' ').slice(0, 15)).length>=11 ?
                        <Text> 
                          {data.content.replace(/\n/g,' ').slice(0, 15) }...
                        </Text> 
                      : <Text> 
                          {data.content.replace(/\n/g,' ').slice(0, 11) }
                        </Text>
                    }
                    
                  </Body>                  
                  
                  <Body style={{flex: 1}}>
                    {
                      <Text>사진</Text>
                      /*
                      image && image.length ?
                      <Image 
                        source={{ uri: image[0] }} 
                        style={{ height:100, width:150 }} />
                    : null
                    */
                    }
                  </Body>
              </CardItem>
            </TouchableOpacity>
        </Card>
      );
    }
  }