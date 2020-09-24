import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon, Container, Header } from 'native-base'; 
import styles from '../../../css/bottom/Bidding/WriteModalCSS.js' 

class DetailSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let {sellbuy, lst} = this.props;
    if(sellbuy === 1){
        return(
          <TouchableOpacity style={styles.button} onPress={this.props.detailToggle}>
            <Text style={{margin:5}}>세부정보</Text>
          </TouchableOpacity>
        )
      }  
      else if(sellbuy === 0){
        return(
            <TouchableOpacity style={styles.facilityButton} onPress={this.props.convToggle}>
              {lst.includes('음식점'||'카페'||'편의점'||'병원')?(<Text>편의시설: </Text>):<Text style={{margin:5}}>편의시설</Text>}
              <View style={{flex:1, flexDirection:'row', justifyContent:'space'}}>
              {lst.includes('음식점')?
                (<Text style={{margin:3, color:'#FF5C3B'}}>음식점</Text>):null
              }
              {lst.includes('카페')?
                (<Text style={{margin:3, color:'#FF5C3B'}}>카페</Text>):null
              }
              {lst.includes('편의점')?
                (<Text style={{margin:3, color:'#FF5C3B'}}>편의점</Text>):null
              }
              {lst.includes('병원')?
                (<Text style={{margin:3, color:'#FF5C3B'}}>병원</Text>):null
              }
              </View>
            </TouchableOpacity>
        )  
      }else{
          return<View></View>
      }
  }
}

export default DetailSection;
