
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {  Container, Content,Icon, Header } from 'native-base'; 

export default class ContectedO extends Component {

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name='ios-add-circle' style={{color: tintColor}}/>
        )
    }

    render() {
        return (
            <Container style={style.container}>
             <Text>연락한 부동산</Text>
          
          </Container>
        );
    }
}
 
const style = StyleSheet.create({
    container: {
        flex: 1,

    }
});