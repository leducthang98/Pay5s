import React, {Component} from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import Header from '../components/common/Header';
import RechargePhoneContainer from '../screens/recharge_phone/RechargePhoneContainer';
import * as COLOR from '../constant/Colors';
import * as Layout from '../constant/Layout';
import { getString } from '../res/values/String';

const {width, height} = Layout.window;
const service = 'EPIN';


export default class BuyCard extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const route = {service: service, navigation:this.props.navigation};
    return(
      <View style={styles.container}>
        <Header back={true} navigation={this.props.navigation} title={getString('BUY_CARD')}/>
        <RechargePhoneContainer route={route}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    width: width,
    height:height,
    backgroundColor:COLOR.BACKGROUND_COLOR
  }
})