import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
  StatusBar,
  FlatList,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { scale } from '../configs/Scale';
import { shadow } from '../configs/CommonStyles';
import { statusBarHeight } from '../configs/Layout';
import { WALLET, NOTIFICATION, RECHARGEMONEY, TRANSFERMONEY, RECHARGEPHONE } from '../navigators/RouteName';
const transfersMoney = () => console.log("transfersMoney")
const rechargePhone = () => console.log("rechargePhone")
const buyCardID = () => console.log("buyCardID")
const internetViettel = () => console.log("internetViettel")
const KPlus = () => console.log("KPlus")
const Support = () => console.log("Support")
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.mainService = [
      { iconName: 'wallet', label: 'Nạp tiền', onPress: () => this.rechargeMoney() },
      { iconName: 'hand-holding-usd', label: 'Chuyển tiền', onPress: () => this.transferMoney() },
      { iconName: 'file-alt', label: 'Lịch sử', onPress: () => this.checkWallet() },
    ];
    this.otherService = [
      { iconName: 'mobile-alt', label: 'Nạp tiền điện thoại', onPress: () => this.rechargePhone(), color: "#EDE574" },
      { iconName: 'receipt', label: 'Mua mã thẻ', onPress: buyCardID, color: "#2d5e57" },
      { iconName: 'globe', label: 'Internet Viettel', onPress: internetViettel, color: "#099FFF" },
      { iconName: 'korvue', label: 'Gia hạn K+', onPress: KPlus, color: "#00FF00" },
    ];
    this.otherService2 = [
      { iconName: 'headset', label: 'Chat hỗ trợ', onPress: Support, color: "#099FFF" },
      {},
      {},
      {},
    ];

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
      <Icon style={{ flex: 1 }} name={iconName} size={scale(28)} color={"#F8b195"} />
      <Text style={{ fontSize: scale(10), paddingBottom: scale(6) }}>{label}</Text>
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


  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <View style={[styles.header]}>
            <View style={styles.insideHeader}>
              <View style={{ flex: 14, flexDirection: 'row' }}>
                <Text style={{ color: 'white', fontSize: scale(14) }}> Xin chào</Text>
                <Text style={{ color: 'white', fontSize: scale(14), fontWeight: 'bold' }}>, Le Duc Thang</Text>
              </View>
              <TouchableOpacity
                onPress={() => this.notification()}
              >
                <Icon style={{ flex: 1 }} name={'bell'} size={scale(23)} color={"white"} />
              </TouchableOpacity>

            </View>
          </View>
          <View style={styles.account}>
            <TouchableOpacity
              onPress={() => this.checkWallet()}
              style={{ height: (containerH / 5.3) * 2 / 5, borderTopLeftRadius: scale(7), borderTopRightRadius: scale(7), flexDirection: 'row', alignItems: "center", borderBottomColor: 'gray', borderBottomWidth: scale(0.5) }}
            >
              <Text
                style={{ flex: 6, paddingLeft: scale(7), fontSize: scale(15) }}>Số dư Pay5s</Text>
              <Text style={{ flex: 3, fontSize: scale(15), fontWeight: 'bold', textAlign: 'center' }}>10.000.000đ</Text>
              <Icon style={{ flex: 1 }} name={'chevron-right'} size={scale(16)} color={"black"} />
            </TouchableOpacity>
            <View style={{ height: (containerH / 5.3) * 3 / 5, borderBottomLeftRadius: scale(7), borderBottomRightRadius: scale(7), flexDirection: 'row', }}>
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
            {
              this.otherService2.map((item, index) => {
                return this._renderOtherServices(item.iconName, item.label, item.onPress, item.color)
              })
            }
          </View>
        </View>
      </ScrollView>

    );
  }
}
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    width: containerW,
    height: containerH,
  },
  header: {
    backgroundColor: '#C71585',
    width: containerW + scale(20),
    height: containerH / 5,
    borderBottomLeftRadius: scale(27),
    borderBottomRightRadius: scale(27),
    alignItems: 'center',
    paddingTop: statusBarHeight / 1.5,

  },
  insideHeader: {
    backgroundColor: '#C71585',
    width: containerW / 1.08,
    height: containerH / 10,
    flexDirection: 'row',
    paddingTop: scale(14)
  },
  account: {
    backgroundColor: 'white',
    width: containerW / 1.08,
    height: containerH / 5.3,
    borderRadius: scale(7),
    marginTop: '-16%',
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
    width: containerW / 1.08,
    height: containerH / 6.3,
    flexDirection: 'row',
    marginTop: '3%',
    borderTopLeftRadius: scale(7),
    borderTopRightRadius: scale(7),
    backgroundColor: 'white',


  },
  service2: {
    width: containerW / 1.08,
    height: containerH / 6.3,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomLeftRadius: scale(7),
    borderBottomRightRadius: scale(7),
  },

});
export default HomeScreen;
a