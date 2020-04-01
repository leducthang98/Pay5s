import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
  StatusBar,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { scale } from '../configs/Scale';
import { shadow } from '../configs/CommonStyles';
import { statusBarHeight } from '../configs/Layout';
const checkWallet = () => console.log("checkWallet")
const bell = () => console.log("bell")
const rechargeMoney = () => console.log("rechargeMoney")
const transfersMoney = () => console.log("transfersMoney")
const history = () => console.log("history")
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
      { iconName: 'wallet', label: 'Nạp tiền', onPress: rechargeMoney},
      { iconName: 'hand-holding-usd', label: 'Chuyển tiền', onPress: transfersMoney},
      { iconName: 'file-alt', label: 'Lịch sử', onPress: history},
    ];
  }

  _renderMainService = (iconName, label, onPress) => (
    <TouchableOpacity style={{ flex: 1, alignItems: 'center', paddingTop: scale(7) }} onPress={onPress}>
      <Icon style={{ flex: 1 }} name={iconName} size={scale(28)} color={"#F8b195"} />
      <Text style={{ fontSize: scale(10), paddingBottom: scale(6) }}>{label}</Text>
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
                onPress={bell}
              >
                <Icon style={{ flex: 1 }} name={'bell'} size={scale(23)} color={"white"} />
              </TouchableOpacity>

            </View>
          </View>
          <View style={styles.account}>
            <TouchableOpacity
              onPress={checkWallet}
              style={{ height: (containerH / 5.3) * 2 / 5, borderTopLeftRadius: scale(7), borderTopRightRadius: scale(7), flexDirection: 'row', alignItems: "center", borderBottomColor: 'gray', borderBottomWidth: scale(0.5) }}
            >
              <Text
                style={{ flex: 6, paddingLeft: scale(7), fontSize: scale(15) }}>Số dư Pay5s</Text>
              <Text style={{ flex: 3, fontSize: scale(15), fontWeight: 'bold',textAlign:'center' }}>10.000.000đ</Text>
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
            <TouchableOpacity style={{ flex: 1, alignItems: 'center', paddingTop: scale(7) }}
              onPress={rechargePhone}
            >
              <Icon style={{ flex: 1 }} name={'mobile-alt'} size={scale(30)} color={"#EDE574"} />
              <Text style={{ fontSize: scale(12), paddingBottom: scale(16), textAlign: 'center' }}>Nạp tiền điện thoại</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, alignItems: 'center', paddingTop: scale(7) }}
              onPress={buyCardID}
            >
              <Icon style={{ flex: 1 }} name={'receipt'} size={scale(30)} color={"#2d5e57"} />
              <Text style={{ fontSize: scale(12), paddingBottom: scale(30), textAlign: 'center' }}
              >Mua mã thẻ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, alignItems: 'center', paddingTop: scale(7) }}
              onPress={internetViettel}
            >
              <Icon style={{ flex: 1 }} name={'globe'} size={scale(30)} color={"#099FFF"} />
              <Text style={{ fontSize: scale(12), paddingBottom: scale(16), textAlign: 'center' }}>Internet    Viettel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, alignItems: 'center', paddingTop: scale(7) }}
              onPress={KPlus}
            >
              <Icon style={{ flex: 1 }} name={'korvue'} size={scale(30)} color={"#00FF00"} />
              <Text style={{ fontSize: scale(12), paddingBottom: scale(16), textAlign: 'center' }}>Gia hạn              K+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.service2}>
            <TouchableOpacity style={{ flex: 1, alignItems: 'center', paddingTop: scale(7) }}
              onPress={Support}
            >
              <Icon style={{ flex: 1 }} name={'headset'} size={scale(30)} color={"#099FFF"} />
              <Text style={{ fontSize: scale(12), paddingBottom: scale(30), textAlign: 'center' }}>Chat hỗ trợ</Text>
            </TouchableOpacity>
            <View style={{ flex: 3 }}></View>
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
    backgroundColor: '#ee2797',
    width: containerW + scale(20),
    height: containerH / 5,
    borderBottomLeftRadius: scale(27),
    borderBottomRightRadius: scale(27),
    alignItems: 'center',
    paddingTop: statusBarHeight / 1.5,

  },
  insideHeader: {
    backgroundColor: '#ee2797',
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

    elevation: 2,
  },
  service1: {
    width: containerW / 1.08,
    height: containerH / 5.6,
    flexDirection: 'row',
    marginTop: '2%',
    borderTopLeftRadius: scale(7),
    borderTopRightRadius: scale(7),
    backgroundColor: 'white',


  },
  service2: {
    width: containerW / 1.08,
    height: containerH / 5.6,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomLeftRadius: scale(7),
    borderBottomRightRadius: scale(7),
  },

});
export default HomeScreen;
