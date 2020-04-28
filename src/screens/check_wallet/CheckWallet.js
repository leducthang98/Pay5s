import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  RefreshControl
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
import { RECHARGEMONEY, TRANSFERMONEY, LOGIN } from '../../navigators/RouteName';
import { getTransfer } from '../../actions/ActionHomeScreen';
import { formatMoney } from '../../constant/CommonFormat';
import { refreshStore } from '../../actions/ActionRefresh';
import Toast from 'react-native-simple-toast';
import { CommonActions } from '@react-navigation/native';
class CheckWallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    }
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
  async tokenInvalidFunction() {
    this.props.refreshStore();
    await AsyncStorage.clear();
    Toast.show("Phiên đăng nhập đã hết hạn, bạn sẽ được quay trở về trang đăng nhập.")
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: LOGIN }],
      })
    );
  }
  async _onRefresh() {
    const token_user = await AsyncStorage.getItem('access_token');
    this.setState({
      ...this.state,
      refreshing: true
    })
    this.props.getTransfer(token_user);
    this.setState({
      ...this.state,
      refreshing: false
    })
  }
  render() {
    if (this.props.accountInfo) {
      const accountResponse = this.props.accountInfo;
      if (accountResponse.errorCode === 200) {
        return (
          <View style={{ flex: 1 }}>
            <Header navigation={this.props.navigation} back={true} title={'Số dư'} />
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this._onRefresh()} />}
            >
              <View style={styles.body}>
                <TouchableOpacity style={{ flex: 1, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' }} onPress={() => this.transferMoney()}>
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Icon name={'qrcode'} size={scale(23)} color={"black"} />
                  </View>
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Text style={{ fontSize: scale(11), paddingTop: scale(5), textAlign:'center' }}>Nạp số dư</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' }} onPress={() => this.transferMoney()}>
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Icon name={'minus-square'} size={scale(23)} color={"black"} />
                  </View>
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Text
                      // numberOfLines={1}
                      style={{ fontSize: scale(11), paddingTop: scale(5), textAlign: 'center' }}>Chuyển khoảnnnnnn</Text>
                  </View>
                </TouchableOpacity>
                <View style={{ flex: 2, backgroundColor: 'white' }}>
                  <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Icon style={{ paddingLeft: scale(5) }} name={'dollar-sign'} size={scale(15)} color={"purple"} />
                    <Text style={{ fontSize: scale(12), paddingLeft: scale(5) }}>Số dư</Text>
                  </View>
                  <View style={{ backgroundColor: 'white', flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                    <Text style={{ paddingBottom: scale(3), paddingRight: scale(5), fontWeight: 'bold', fontSize: scale(16), color: 'purple' }}>{formatMoney(accountResponse.data.balance)}đ</Text>
                  </View>
                </View>
              </View>
              <AccountTabView navigation={this.props.navigation} />
            </ScrollView>
          </View>
        );
      }
      else if (accountResponse.errorCode === 500) {
        this.tokenInvalidFunction();
        return null;
      }
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
    refreshStore: () => {
      dispatch(refreshStore())
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CheckWallet);
