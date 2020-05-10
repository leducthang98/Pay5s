import React from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image, SectionList, ScrollView, RefreshControl, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { scale, scaleModerate, scaleVertical } from '../../constant/Scale';
import { statusBarHeight } from '../../constant/Layout';
import { WALLET, ACCOUNTINFO, LOGIN, TRANS_PASSWORD_SCREEN } from '../../navigators/RouteName';
import ItemAccount from '../../components/account/ItemAccount';
import * as COLOR from '../../constant/Colors';
import Header from '../../components/common/Header';
import { connect } from 'react-redux'
import { formatMoney } from '../../constant/CommonFormat';
import Loading from '../../components/common/Loading';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import { CommonActions } from '@react-navigation/native';
import { refreshStore } from '../../actions/ActionRefresh';
import { PRIMARY_COLOR,PURPLE_FONTCOLOR,GRAY_FONTCOLOR,PINK_FONTCOLOR } from '../../constant/Colors'
import { getAccountInfo, getCommonConfig } from '../../actions/ActionHomeScreen';
class AccountScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    }
  };

  checkWallet() {
    this.props.navigation.navigate(WALLET);
  }

  intro = () => {
    Alert.alert(
      'Thông báo',
      'Tính năng đang phát triển',
      [
        { text: 'Đóng', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  };

  goToFanPage = (url) => {
    Linking.openURL(url)
  };

  showTermsAndAgreement = () => {
    console.log('Dieu khoan su dung');
  };

  showApplicationInfo = () => {
    console.log('Thong tin ung dung');
  };
  security = () => {
    this.props.navigation.navigate(TRANS_PASSWORD_SCREEN);
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
    this.props.getAccountInfo(token_user);
    this.props.getCommonConfig(token_user);
    this.setState({
      ...this.state,
      refreshing: false
    })
  }
  render() {
    if (this.props.accountInfo && this.props.commonConfigData) {
      const accountResponse = this.props.accountInfo;
      const commonConfigResponse = this.props.commonConfigData;
      if (accountResponse.errorCode === 200 && commonConfigResponse.errorCode === 200) {
        const itemList = [{
          section: 1,
          data: [{
            iconLeftName: require('../../res/images/account_screen/amount.png'),
            title: 'Số dư: ',
            extraInfo: formatMoney(accountResponse.data.balance) + 'đ',
            onPress: () => this.checkWallet(),
            iconLeftColor: COLOR.GOLD,
            extraInfoColor: PURPLE_FONTCOLOR,
            canPress: true,
          }, {
            iconLeftName: require('../../res/images/account_screen/secure.png'),
            title: 'Bảo mật giao dịch',
            subTitle: 'Quản lý mật khẩu giao dịch',
            onPress: () => this.security(),
            iconLeftColor: 'black',
            canPress: true,
          },],
        }, {
          section: 2,
          data: [
            {
              iconLeftName: require('../../res/images/account_screen/fanpage.png'),
              title: 'Fanpage',
              subTitle: 'Facebook Fanpage chăm sóc khách hàng',
              onPress: () => this.goToFanPage(commonConfigResponse.data.fanpage),
              iconLeftColor: COLOR.FACEBOOK,
              canPress: true,
            }, {
              iconLeftName: require('../../res/images/account_screen/id.png'),
              title: 'Mã giới thiệu: ',
              extraInfo: 0 + accountResponse.data.mobile,
              subTitle: 'Giới thiệu bạn tham gia Pay5s - App và nhận thưởng',
              onPress: () => this.intro(),
              iconLeftColor: COLOR.PURPLE,
              extraInfoColor: COLOR.PINK_FONTCOLOR,
              canPress: true,
            }],
        }, {
          section: 3,
          data: [
            {
              iconLeftName: require('../../res/images/account_screen/info.png'),
              title: 'Thông tin ứng dụng',
              subTitle: 'Sản phẩm của Pay5s - Phiên bản hiện tại: 1.0.2',
              onPress: () => this.showApplicationInfo(),
              iconLeftColor: COLOR.QUESTION,
              canPress: false,
            }
          ],
        }
        ];
        return (

          <View style={styles.container}>
            <Header title={'Tài khoản'} />
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this._onRefresh()} />}
            >
              <View style={styles.body1}>
                <TouchableOpacity style={{ flex: 2.5, justifyContent: 'center', alignItems: 'center', paddingLeft: scale(7) }}>
                  <View style={{ width: containerH / 8, height: containerH / 8, justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ height: '80%', width: '80%' }}
                      source={require('../../res/images/account_screen/logo.png')}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.infoArea}
                  onPress={() => this.props.navigation.navigate(ACCOUNTINFO)}
                >
                  <View style={{ flex: 8, justifyContent: 'flex-start', flexDirection: 'column' }}>
                    <Text style={{ fontSize: scale(20) }}>{accountResponse.data.fullname}</Text>
                    <Text style={{ fontSize: scale(15), color:PURPLE_FONTCOLOR,fontWeight:'700'}}>0{accountResponse.data.mobile}</Text>
                  </View>
                  <Icon style={{ flex: 0.6 }} name={'chevron-right'} size={scale(18)} color={PINK_FONTCOLOR} />
                </TouchableOpacity>
              </View>
              <SectionList
                keyExtractor={(item, index) => item + index}
                sections={itemList}
                renderItem={({ item }) =>
                  <ItemAccount
                    {...this.props}
                    iconLeftName={item.iconLeftName}
                    title={item.title}
                    canPress={item.canPress}
                    subTitle={item.subTitle}
                    onPress={() => item.onPress()}
                    extraInfo={item.extraInfo}
                    extraInfoColor={item.extraInfoColor}
                    iconLeftColor={item.iconLeftColor}
                  />
                }
                renderSectionHeader={({ section: { section } }) => (
                  <View style={{ width: containerW, height: scaleVertical(8) }} />
                )}
              />
            </ScrollView>
          </View>
        );
      }
      else if (accountResponse.errorCode === 500 || commonConfigResponse.errorCode === 500) {
        this.tokenInvalidFunction();
        return null;
      }
    }
    else {
      return (
        <Loading></Loading>
      );
    }
  }
}

const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    width: containerW,
    height: containerH,
    alignItems: 'center',
  },
  header: {
    width: containerW,
    height: containerH / 13,
    backgroundColor: '#C71585',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: statusBarHeight / 1.5,
  },
  body1: {
    width: containerW,
    height: containerH / 8,
    marginTop: '2%',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  headerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: scale(16),
  },
  infoArea: {
    flex: 8,
    flexDirection: 'row',
    marginBottom: scale(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: scale(10),
  },
});

const mapStateToProps = (store) => {
  return {
    accountInfo: store.homeReducer.accountInfo,
    commonConfigData: store.homeReducer.commonConfigData

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getAccountInfo: (token_user) => {
      dispatch(getAccountInfo(token_user))
    },
    getCommonConfig: (token_user) => {
      dispatch(getCommonConfig(token_user))
    },
    refreshStore: () => {
      dispatch(refreshStore())
    },

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
