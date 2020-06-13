import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView
} from 'react-native';

import Header from '../components/common/Header';
import RechargePhoneContainer from '../screens/recharge_phone/RechargePhoneContainer';
import * as COLOR from '../constant/Colors';
import * as Layout from '../constant/Layout';
import { getString } from '../res/values/String';

const {width, height} = Dimensions.get('screen');
const service = 'EPIN';


export default class BuyCard extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const route = {service: service, navigation:this.props.navigation};
    return(
      <SafeAreaView style={styles.container}>
        <Header back={true} navigation={this.props.navigation} title={getString('BUY_CARD')}/>
        <RechargePhoneContainer route={route}/>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:COLOR.BACKGROUND_COLOR
  }
})
