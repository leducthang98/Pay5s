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
  Linking,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { scale, scaleVertical } from '../constant/Scale';
import { shadow, size } from '../constant/CommonStyles';
import { statusBarHeight } from '../constant/Layout';
import {
  WALLET,
  NOTIFICATION,
  RECHARGEMONEY,
  TRANSFERMONEY,
  RECHARGEPHONE,
  INITNOTIFICATION,
  LOGIN,
  BUY_CARD,
  INTERNET_VIETTEL,
} from '../navigators/RouteName';
import AsyncStorage from '@react-native-community/async-storage';
import { getAccountInfo, getCommonConfig, getNotification } from '../actions/ActionHomeScreen';
import { formatMoney } from '../constant/CommonFormat';
import Loading from '../components/common/Loading';
import { CommonActions } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import { refreshStore } from '../actions/ActionRefresh';
import { PRIMARY_COLOR, PINK_FONTCOLOR, PURPLE_FONTCOLOR, GRAY_FONTCOLOR, FACEBOOK } from '../constant/Colors';
import OneSignal from 'react-native-onesignal';
import LinearGradient from 'react-native-linear-gradient';
import { MAIN_SERVICE, NETWORK, OTHER_SERVICE } from '../constant/Icon';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
    this.mainService = [
      { name: 'DEPOSIT', label: 'Nạp tiền', onPress: () => this.rechargeMoney() },
      { name: 'TRANSFER', label: 'Chuyển tiền', onPress: () => this.transferMoney() },
      { name: 'HISTORY', label: 'Lịch sử', onPress: () => this.checkWallet() },
    ];
    this.otherService = [
      { iconName: 'RECHARGE_PHONE', label: 'Nạp tiền điện thoại', onPress: () => this.rechargePhone(), color: '#5557d2' },
      { iconName: 'BUY_CARD_ID', label: 'Mua mã thẻ', onPress: () => this.buyCardID(), color: '#6c38c1' },
      { iconName: 'INTERNET_VIETTEL', label: 'Internet Viettel', onPress: () => this.internetViettel(), color: '#5a4fca' },
      { iconName: 'KPLUS', label: 'Gia hạn K+', onPress: () => this.KPlus(), color: '#ce42bd' },
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
    this.props.navigation.navigate(INTERNET_VIETTEL);
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
    this.props.navigation.navigate(WALLET);
  }

  notification() {
    this.props.navigation.navigate(NOTIFICATION);
  }

  rechargeMoney() {
    this.props.navigation.navigate(RECHARGEMONEY);
  }

  transferMoney() {
    this.props.navigation.navigate(TRANSFERMONEY);
  }

  rechargePhone() {
    this.props.navigation.navigate(RECHARGEPHONE);
  }

  _renderMainService = (name, label, onPress) => (
    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: '100%', width: '33.33333333%' }}
      onPress={onPress}>
      <View style={{ width: '85%', height: '85%', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '100%', height: '70%', alignItems: 'center', justifyContent: 'center' }}>
          <Image source={MAIN_SERVICE[name || 'DEPOSIT']} style={{ width: '100%', height: '100%' }} resizeMode={'contain'} />
          {console.log('source = ', MAIN_SERVICE[name])}
        </View>
        <View style={{ width: '100%', height: '30%', alignItems: 'center', justifyContent: 'flex-start' }}>
          <Text style={{ fontSize: scale(13), color: PINK_FONTCOLOR }}>{label}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  _renderOtherServices = (iconName, label, onPress, color) => (
    <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      onPress={onPress}
    >
      <View style={{ width: '90%', height: '70%', backgroundColor: color, borderRadius: scale(5),paddingTop:scale(5) }}>
        <View style={{ width: '100%', height: '60%' }}>
          <Image source={OTHER_SERVICE[iconName || 'RECHARGEPHONE']} style={{ width: '100%', height: '100%' }} resizeMode={'contain'} />
        </View>
        <View style={{ width: '100%', height: '40%', justifyContent: 'center', alignItems: 'center' }}>
          <Text textAlign={'auto'} style={{ fontSize: scale(13), color: 'white' }} numberOfLines={1}>{label}</Text>
        </View>
      </View>
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
          defaultImage: defaultImage,
        },
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
                  defaultImage,
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
    Toast.show('Phiên đăng nhập đã hết hạn, bạn sẽ được quay trở về trang đăng nhập.');
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: LOGIN }],
      }),
    );
  }

  async _onRefresh() {
    const token_user = await AsyncStorage.getItem('access_token');
    this.setState({
      ...this.state,
      refreshing: true,
    });
    this.props.getAccountInfo(token_user);
    this.props.getCommonConfig(token_user);
    this.props.getNotification(token_user);
    this.setState({
      ...this.state,
      refreshing: false,
    });
  }


  render() {
    if (this.props.accountInfo && this.props.notiData && this.props.commonConfigData) {
      const accountResponse = this.props.accountInfo;
      const notiResponse = this.props.notiData;
      const commonResponse = this.props.commonConfigData;
      if (accountResponse.errorCode === 200 && notiResponse.errorCode === 200 && commonResponse.errorCode === 200) {
        OneSignal.sendTags({
          mobile: accountResponse.data.mobile,
        });
        return (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this._onRefresh()} />}
            style={styles.container}>
            <View style={{ alignItems: 'center' }}>
              <LinearGradient
                start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }}

                colors={['#ff547c', '#c944f7']}
                style={[styles.header]}>
                <View style={[styles.insideHeader]}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'white', fontSize: scale(18) }}> Xin chào </Text>
                    <Text style={{
                      color: 'white',
                      fontSize: scale(18),
                      fontWeight: 'bold',
                    }}>0{accountResponse.data.mobile}</Text>
                  </View>
                </View>
              </LinearGradient>
              <View style={styles.account}>
                <TouchableOpacity
                  onPress={() => this.checkWallet()}
                  style={{
                    height: (containerH / 5.3) * 2 / 5,
                    borderTopLeftRadius: scale(7),
                    borderTopRightRadius: scale(7),
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomColor: GRAY_FONTCOLOR,
                    borderBottomWidth: scale(0.5),
                  }}>
                  <Text
                    style={{ flex: 6, paddingLeft: scale(7), fontSize: scale(15), color: GRAY_FONTCOLOR }}>Số dư</Text>
                  <Text style={{
                    flex: 3,
                    fontSize: scale(15),
                    fontWeight: 'bold',
                    textAlign: 'right',
                    color: PURPLE_FONTCOLOR,
                  }}>{formatMoney(accountResponse.data.balance)}đ</Text>
                  <View style={{ flex: 0.2 }}></View>
                  <Icon style={{ flex: 1 }} name={'chevron-right'} size={scale(16)} color={'black'} />
                </TouchableOpacity>
                <View style={{
                  height: (containerH / 5.3) * 3 / 5,
                  borderBottomLeftRadius: scale(7),
                  borderBottomRightRadius: scale(7),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {
                    this.mainService.map((item, index) => {
                      return this._renderMainService(item.name, item.label, item.onPress);
                    })
                  }
                </View>
              </View>

              <View style={styles.service1}>
                {
                  this.otherService.map((item, index) => {
                    return this._renderOtherServices(item.iconName, item.label, item.onPress, item.color);
                  })
                }
              </View>
              <View style={styles.service2}>
                <TouchableOpacity style={{ flex: 1, alignItems: 'center', paddingTop: scale(12) }}
                  onPress={() => this.support(commonResponse.data.hotline, commonResponse.data.fanpage)}>
                  <View style={{ width: '90%', height: '70%', backgroundColor: '#e34a80', borderRadius: scale(5),paddingTop:scale(5)  }}>
                    <View style={{ width: '100%', height: '60%' }}>
                      <Image source={OTHER_SERVICE['SUPPORT']} style={{ width: '100%', height: '100%' }} resizeMode={'contain'} />
                    </View>
                    <View style={{ width: '100%', height: '40%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text textAlign={'auto'} style={{ fontSize: scale(13), color: 'white' }} numberOfLines={1}>Hỗ trợ</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center', paddingTop: scale(12) }}>

                </View>
                <View style={{ flex: 1, alignItems: 'center', paddingTop: scale(12) }}>

                </View>
                <View style={{ flex: 1, alignItems: 'center', paddingTop: scale(12) }}>

                </View>
              </View>
              <View style={styles.notification}>
                <View
                  style={{ flexDirection: 'row', height: scale(30), paddingLeft: scale(10), paddingRight: scale(10) }}>
                  <View style={{ alignItems: 'flex-start', justifyContent: 'flex-end', flex: 1 }}>
                    <Text style={{ fontSize: scale(15), fontWeight: '600', color: GRAY_FONTCOLOR }}>Tin tức</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', flex: 1 }}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate(NOTIFICATION)}>
                      <Text style={{ fontSize: scale(15), fontWeight: '600', color: PINK_FONTCOLOR }}>Xem
                        tất cả</Text>
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

                        let defaultImage = commonResponse.data.banner.default;
                        return this._renderNotification(img_preview, img_avatar, headline, published_date, author, content, description, defaultImage);
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
    } else {
      return (
        <Loading></Loading>
      );
    }
  }
}

const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
const styles = StyleSheet.create({
  notification: {
    marginTop: scaleVertical(8),
    width: containerW,
    backgroundColor: 'white',
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
    width: containerW / 1.08,
    height: containerH / 10,
    flexDirection: 'row',
    paddingTop: statusBarHeight - scale(10),
  },
  account: {
    backgroundColor: 'white',
    width: containerW / 1.08,
    height: containerH / 5.3,
    borderRadius: scale(2),
    marginTop: -scale(50),
    flexDirection: 'column',
    shadowColor: '#000',
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
    height: containerH / 6.5,
    flexDirection: 'row',
    marginTop: '3%',
    backgroundColor: 'white',
    paddingLeft: scale(7)

  },
  service2: {
    width: containerW,
    height: containerH / 6.5,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingLeft: scale(7)
  },

});

const mapStateToProps = (store) => {
  return {
    accountInfo: store.homeReducer.accountInfo,
    notiData: store.homeReducer.notiData,
    commonConfigData: store.homeReducer.commonConfigData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAccountInfo: (token_user) => {
      dispatch(getAccountInfo(token_user));
    },
    getCommonConfig: (token_user) => {
      dispatch(getCommonConfig(token_user));
    },
    getNotification: (token_user) => {
      dispatch(getNotification(token_user));
    },
    refreshStore: () => {
      dispatch(refreshStore());
    },


  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
