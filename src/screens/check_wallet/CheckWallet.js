import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {scale} from '../../configs/Scale';
import {statusBarHeight} from '../../configs/Layout';
import AccountTabView from '../account/AccountTabView';
import Header from '../../components/common/Header';

const {width} = Dimensions.get('window');
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
export default class CheckWallet extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Header navigation={this.props.navigation} back={true} title={'Thông tin tài khoản'}/>
        <View style={styles.body1}>
          <View style={{flex: 1, backgroundColor: 'red'}}></View>
          <View style={{flex: 1, backgroundColor: 'green'}}></View>
          <View style={{flex: 2, backgroundColor: 'blue'}}></View>
        </View>
        <AccountTabView/>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    width: containerW,
    height: containerH,
    alignItems: 'center',
  },
  header: {
    width: containerW,
    height: containerH / 11,
    backgroundColor: '#C71585',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: statusBarHeight / 1.5,
  },
  body1: {
    width: containerW,
    height: containerH / 8,
    flexDirection: 'row',
    backgroundColor: 'white',
  },

});
