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
import { scale } from '../../constant/Scale';
import { statusBarHeight } from '../../constant/Layout';
import AccountTabView from '../account/AccountTabView';
import Header from '../../components/common/Header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import Loading from '../../components/common/Loading';
const { width } = Dimensions.get('window');
const containerW = Dimensions.get('window').width;
import AsyncStorage from '@react-native-community/async-storage';
const containerH = Dimensions.get('window').height;
import { WALLET, NOTIFICATION, RECHARGEMONEY, TRANSFERMONEY, RECHARGEPHONE } from '../../navigators/RouteName';
import { getTransfer } from '../../actions/ActionHomeScreen';
class CheckWallet extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    const token_user = await AsyncStorage.getItem('access_token')
    this.props.getTransfer(token_user);
  }
  rechargeMoney() {
    this.props.navigation.navigate(RECHARGEMONEY)
  }
  transferMoney() {
    this.props.navigation.navigate(TRANSFERMONEY)
  }
  render() {
    if (this.props.accountInfo) {
      return (
        <View style={{ flex: 1 }}>
          <Header navigation={this.props.navigation} back={true} title={'Số dư'} />
          <View style={styles.body}>
            <TouchableOpacity style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }} onPress={() => this.rechargeMoney()}>
              <Icon name={'qrcode'} size={scale(23)} color={"black"} />
              <Text style={{ fontSize: scale(11), paddingTop: scale(3) }}>Nạp số dư</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }} onPress={() => this.transferMoney()}>
              <Icon name={'minus-square'} size={scale(23)} color={"black"} />
              <Text style={{ fontSize: scale(11), paddingTop: scale(3) }}>Chuyển khoản</Text>
            </TouchableOpacity>
            <View style={{ flex: 2, backgroundColor: 'white' }}>
              <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Icon style={{ paddingLeft: scale(5) }} name={'dollar-sign'} size={scale(15)} color={"purple"} />
                <Text style={{ fontSize: scale(12), paddingLeft: scale(5) }}>Số dư</Text>
              </View>
              <View style={{ backgroundColor: 'white', flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                <Text style={{ paddingBottom: scale(3), paddingRight: scale(5), fontWeight: 'bold', fontSize: scale(16), color: 'purple' }}>{this.props.accountInfo.balance}đ</Text>
              </View>
            </View>
          </View>
          <AccountTabView />
        </View>
      );
    } else {
      return (
        <Loading></Loading>
      );
    }

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
  body: {
    width: containerW,
    height: containerH / 8,
    flexDirection: 'row',
    backgroundColor: 'white',
  },

});
const mapStateToProps = (store) => {
  return {
    accountInfo: store.homeReducer.accountInfo
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getTransfer: (token_user) => {
      dispatch(getTransfer(token_user))
    },

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CheckWallet);
