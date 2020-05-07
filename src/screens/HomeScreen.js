import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
  Image,
  Alert,
  RefreshControl,
  Linking
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { scale, scaleVertical } from '../constant/Scale';
import { shadow } from '../constant/CommonStyles';
import { statusBarHeight } from '../constant/Layout';
import { WALLET, NOTIFICATION, RECHARGEMONEY, TRANSFERMONEY, RECHARGEPHONE, INITNOTIFICATION, LOGIN, BUY_CARD, INTERNET_VIETTEL } from '../navigators/RouteName';
import AsyncStorage from '@react-native-community/async-storage';
import { getAccountInfo, getCommonConfig, getNotification } from '../actions/ActionHomeScreen';
import { formatMoney } from '../constant/CommonFormat';
import Loading from '../components/common/Loading';
import { FACEBOOK } from '../constant/Colors';
import { CommonActions } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import { refreshStore } from '../actions/ActionRefresh';
import { PRIMARY_COLOR } from '../constant/Colors'
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    }
    this.mainService = [
      { iconName: 'wallet', label: 'Nạp tiền', onPress: () => this.rechargeMoney() },
      { iconName: 'hand-holding-usd', label: 'Chuyển tiền', onPress: () => this.transferMoney() },
      { iconName: 'file-alt', label: 'Lịch sử', onPress: () => this.checkWallet() },
    ];
    this.otherService = [
      { iconName: 'mobile-alt', label: 'Nạp tiền điện thoại', onPress: () => this.rechargePhone(), color: "#EDE574" },
      { iconName: 'receipt', label: 'Mua mã thẻ', onPress: () => this.buyCardID(), color: "#2d5e57" },
      { iconName: 'globe', label: 'Internet Viettel', onPress: () => this.internetViettel(), color: "#099FFF" },
      { iconName: 'korvue', label: 'Gia hạn K+', onPress: () => this.KPlus(), color: "#00FF00" },
    ];
    this.otherService2 = [
      {},
      {},
      {},
      {},
    ];
  }
  async componentDidMount() {
    const token_user = await AsyncStorage.getItem('access_token');
    this.props.getAccountInfo(token_user);
    this.props.getCommonConfig(token_user);
    this.props.getNotification(token_user);
  }
  internetViettel() {
    this.props.navigation.navigate(INTERNET_VIETTEL)
  }
  KPlus() {
    Alert.alert(
      'Thông báo',
      'Tính năng đang phát triển',
      [
        { text: 'Đóng', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }
  buyCardID() {
    // this.props.navigation.navigate(BUY_CARD)
    Alert.alert(
      'Thông báo',
      'Tính năng đang phát triển',
      [
        { text: 'Đóng', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }
  support(hotline, fanpage) {
    Alert.alert(
      'Support',
      'Phương thức hỗ trợ dịch vụ App Pay5s',
      [
        { text: 'Hotline', onPress: () => Linking.openURL('tel:' + hotline) },
        { text: 'Facebook', onPress: () => Linking.openURL(fanpage) },
      ],
      { cancelable: true },
    );
  }
  checkWallet() {
    this.props.navigation.navigate(WALLET)
  }
  notification() {
    this.props.navigation.navigate(NOTIFICATION)
  }
  rechargeMoney() {
    this.props.navigation.navigate(RECHARGEMONEY)
  }
  transferMoney() {
    this.props.navigation.navigate(TRANSFERMONEY)
  }
  rechargePhone() {
    this.props.navigation.navigate(RECHARGEPHONE)
  }
  _renderMainService = (iconName, label, onPress) => (
    <TouchableOpacity style={{ flex: 1, alignItems: 'center', paddingTop: scale(7) }} onPress={onPress}>
      <Icon name={iconName} size={scale(28)} color={"#F8b195"} />
      <Text style={{ fontSize: scale(10), paddingTop: scale(10) }}>{label}</Text>
    </TouchableOpacity>
  );
  _renderOtherServices = (iconName, label, onPress, color) => (
    <TouchableOpacity style={{ flex: 1, alignItems: 'center', paddingTop: scale(12) }}
      onPress={onPress}
    >
      <Icon name={iconName} size={scale(30)} color={color} />
      <Text style={{ fontSize: scale(11), paddingTop: scale(9), textAlign: 'center' }}>{label}</Text>
    </TouchableOpacity>
  );
  _renderNotification = (img_preview, img_avatar, headline, published_date, author, content, description, defaultImage) => (
    <TouchableOpacity
      style={{ height: scale(120) }}
      onPress={() => this.props.navigation.navigate(INITNOTIFICATION, {
        dataNotification: {
          img_preview: img_preview,
          headline: headline,
          published_date: published_date,
          author: author,
          content: content,
          description: description,
          img_avatar: img_avatar,
          defaultImage: defaultImage
        }
      })}
    >
      <View style={{ width: containerW / 1.7, height: scale(110) }}>
        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ height: '90%', width: '90%' }}
            resizeMode={'contain'}
            source={{
              uri:
                (img_avatar) ?
                  'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/p960x960/71949763_2522897797942478_4149955310162804736_o.jpg?_nc_cat=106&_nc_sid=85a577&_nc_ohc=zag8Z2YXtdMAX9BGZT4&_nc_ht=scontent-sin6-1.xx&_nc_tp=6&oh=081596cb6c9afc68b5bb83a069d5aa1a&oe=5EA9804A'
                  :
                  defaultImage
            }}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '80%', height: '100%' }}>
            <Text
              numberOfLines={2}
              style={{ fontSize: scale(11), position: 'absolute', fontWeight: 'bold' }}
            >{headline}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
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
    this.props.getNotification(token_user);
    this.setState({
      ...this.state,
      refreshing: false
    })
  }


  render() {
    if (this.props.accountInfo && this.props.notiData && this.props.commonConfigData) {
      const accountResponse = this.props.accountInfo;
      const notiResponse = this.props.notiData;
      const commonResponse = this.props.commonConfigData;
      if (accountResponse.errorCode === 200 && notiResponse.errorCode === 200 && commonResponse.errorCode === 200) {
        return (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this._onRefresh()} />}
            style={styles.container}>
            <View style={{ alignItems: 'center' }}>
              <View style={[styles.header]}>
                <View style={[styles.insideHeader]}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'white', fontSize: scale(16) }}> Xin chào </Text>
                    <Text style={{ color: 'white', fontSize: scale(16), fontWeight: 'bold' }}>0{accountResponse.data.mobile}</Text>
                  </View>
                  {/* <TouchableOpacity
                    onPress={() => this.support(commonResponse.data.hotline, commonResponse.data.fanpage)}
                  >
                    <Icon style={{ flex: 1 }} name={'comments'} size={scale(23)} color={'white'} />
                  </TouchableOpacity> */}

                </View>
              </View>
              <View style={styles.account}>
                <TouchableOpacity
                  onPress={() => this.checkWallet()}
                  style={{ height: (containerH / 5.3) * 2 / 5, borderTopLeftRadius: scale(7), borderTopRightRadius: scale(7), flexDirection: 'row', alignItems: "center", borderBottomColor: 'gray', borderBottomWidth: scale(0.5) }}
                >
                  <Text
                    style={{ flex: 6, paddingLeft: scale(7), fontSize: scale(14) }}>Số dư</Text>
                  <Text style={{ flex: 3, fontSize: scale(15), fontWeight: 'bold', textAlign: 'right' }}>{formatMoney(accountResponse.data.balance)}đ</Text>
                  <View style={{ flex: 0.2 }}></View>
                  <Icon style={{ flex: 1 }} name={'chevron-right'} size={scale(16)} color={"black"} />
                </TouchableOpacity>
                <View style={{ height: (containerH / 5.3) * 3 / 5, borderBottomLeftRadius: scale(7), borderBottomRightRadius: scale(7), flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  {
                    this.mainService.map((item, index) => {
                      return this._renderMainService(item.iconName, item.label, item.onPress)
                    })
                  }
                </View>
              </View>

              <View style={styles.service1}>
                {
                  this.otherService.map((item, index) => {
                    return this._renderOtherServices(item.iconName, item.label, item.onPress, item.color)
                  })
                }
              </View>
              <View style={styles.service2}>
                {/* {
                this.otherService2.map((item, index) => {
                  return this._renderOtherServices(item.iconName, item.label, item.onPress, item.color)
                })
              } */}
                <TouchableOpacity style={{ flex: 1, alignItems: 'center', paddingTop: scale(12) }}
                  onPress={() => this.support(commonResponse.data.hotline, commonResponse.data.fanpage)}
                >
                  <Icon name={'info-circle'} size={scale(30)} color={PRIMARY_COLOR} />
                  <Text style={{ fontSize: scale(11), paddingTop: scale(9), textAlign: 'center' }}>Hỗ trợ</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center', paddingTop: scale(12) }}
                >

                </View>
                <View style={{ flex: 1, alignItems: 'center', paddingTop: scale(12) }}
                >

                </View>
                <View style={{ flex: 1, alignItems: 'center', paddingTop: scale(12) }}
                >

                </View>
              </View>
              <View style={styles.notification}>
                <View style={{ flexDirection: 'row', height: scale(30), paddingLeft: scale(10), paddingRight: scale(10) }}>
                  <View style={{ alignItems: 'flex-start', justifyContent: 'flex-end', flex: 1 }}>
                    <Text style={{ fontSize: scale(14), fontWeight: '600' }}>Tin tức</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', flex: 1 }}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate(NOTIFICATION)}
                    >
                      <Text style={{ color: FACEBOOK, fontSize: scale(14), fontWeight: '600' }}>Xem tất cả</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ height: scale(150) }}>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ paddingTop: scale(10) }}>
                    {
                      notiResponse.data.rows.map((item, index) => {
                        if (index > 2) {
                          return null;
                        }
                        let img_preview = item.img_preview;
                        let headline = item.headline;
                        let published_date = item.published_date;
                        let author = item.author;
                        let content = item.content;
                        let description = item.description;
                        let img_avatar = item.img_avatar;
                        let defaultImage = commonResponse.data.banner.default
                        return this._renderNotification(img_preview, img_avatar, headline, published_date, author, content, description, defaultImage)
                      })
                    }
                  </ScrollView>
                </View>
              </View>
            </View>
          </ScrollView>

        );
      } else if (accountResponse.errorCode === 500 || notiResponse.errorCode === 500 || commonResponse.errorCode === 500) {
        this.tokenInvalidFunction();
        return null;
      }
    }
    else {
      return (
        <Loading></Loading>
      )
    }
  }
}
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
const styles = StyleSheet.create({
  notification: {
    marginTop: scaleVertical(8),
    width: containerW,
    backgroundColor: 'white'
  },
  container: {
    width: containerW,
    height: containerH,
  },
  header: {
    backgroundColor: PRIMARY_COLOR,
    width: containerW + scale(20),
    height: containerH / 6,
    borderBottomLeftRadius: scale(27),
    borderBottomRightRadius: scale(27),
    alignItems: 'center',
  },
  insideHeader: {
    backgroundColor: PRIMARY_COLOR,
    width: containerW / 1.08,
    height: containerH / 10,
    flexDirection: 'row',
    paddingTop: statusBarHeight/2
  },
  account: {
    backgroundColor: 'white',
    width: containerW / 1.08,
    height: containerH / 5.3,
    borderRadius: scale(7),
    marginTop: -scale(50),
    flexDirection: 'column',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 3,
  },
  service1: {
    width: containerW,
    height: containerH / 7,
    flexDirection: 'row',
    marginTop: '3%',
    backgroundColor: 'white',

  },
  service2: {
    width: containerW,
    height: containerH / 7,
    flexDirection: 'row',
    backgroundColor: 'white',
  },

});

const mapStateToProps = (store) => {
  return {
    accountInfo: store.homeReducer.accountInfo,
    notiData: store.homeReducer.notiData,
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
    getNotification: (token_user) => {
      dispatch(getNotification(token_user))
    },
    refreshStore: () => {
      dispatch(refreshStore())
    },


  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
