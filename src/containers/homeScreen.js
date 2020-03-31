import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { scale } from '../configs/scale';
const checkWallet = () => console.log("haha")
class HomeScreen extends React.Component {

  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <View style={styles.header}>
          <View style={styles.insideHeader}>
            <View style={{ flex: 14, flexDirection: 'row' }}>
              <Text style={{ color: 'white', fontSize: scale(14) }}> Xin chào</Text>
              <Text style={{ color: 'white', fontSize: scale(14), fontWeight: 'bold' }}>, Le Duc Thang</Text>
            </View>
            <Icon style={{ flex: 1 }} name={'bell'} size={scale(23)} color={"white"} />
          </View>
        </View>
        <View style={styles.account}>
          <TouchableOpacity
            onPress={checkWallet}
            style={{ height: (containerH / 5.3) * 2 / 5, borderTopLeftRadius: scale(7), borderTopRightRadius: scale(7), flexDirection: 'row', alignItems: "center", borderBottomColor: 'gray', borderBottomWidth: scale(0.5) }}
          >
            <Text
              style={{ flex: 6, paddingLeft: scale(7), fontSize: scale(15) }}>Số dư Ví Thẻ</Text>
            <Text style={{ flex: 3, fontSize: scale(15), fontWeight: 'bold' }}>10.000.000đ</Text>
            <Icon style={{ flex: 1 }} name={'chevron-right'} size={scale(16)} color={"black"} />
          </TouchableOpacity>
          <View style={{ height: (containerH / 5.3) * 3 / 5, borderBottomLeftRadius: scale(7), borderBottomRightRadius: scale(7), flexDirection: 'row', }}>
            <TouchableOpacity style={{ flex: 1, alignItems: 'center', paddingTop: scale(7) }}>
              <Icon style={{ flex: 1 }} name={'wallet'} size={scale(28)} color={"#F8b195"} />
              <Text style={{ fontSize: scale(10), paddingBottom: scale(6) }}>Nạp tiền</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, alignItems: 'center', paddingTop: scale(7) }}>
              <Icon style={{ flex: 1 }} name={'hand-holding-usd'} size={scale(28)} color={"#F8b195"} />
              <Text style={{ fontSize: scale(10), paddingBottom: scale(6) }}>Chuyển tiền</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, alignItems: 'center', paddingTop: scale(7) }}>
              <Icon style={{ flex: 1 }} name={'file-alt'} size={scale(28)} color={"#F8b195"} />
              <Text style={{ fontSize: scale(10), paddingBottom: scale(6) }}>Lịch sử</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.service}>
          <TouchableOpacity style={{ flex: 1, alignItems: 'center', paddingTop: scale(7) }}>
            <Icon style={{ flex: 1 }} name={'mobile-alt'} size={scale(30)} color={"#EDE574"} />
            <Text style={{ fontSize: scale(12), paddingBottom: scale(16), textAlign: 'center' }}>Nạp tiền điện thoại</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, alignItems: 'center', paddingTop: scale(7) }}>
            <Icon style={{ flex: 1 }} name={'wifi'} size={scale(30)} color={"#2d5e57"} />
            <Text style={{ fontSize: scale(12), paddingBottom: scale(16), textAlign: 'center' }}>Internet    Viettel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, alignItems: 'center', paddingTop: scale(7) }}>
            <Icon style={{ flex: 1 }} name={'korvue'} size={scale(30)} color={"#00FF00"} />
            <Text style={{ fontSize: scale(12), paddingBottom: scale(16), textAlign: 'center' }}>Gia hạn              K+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, alignItems: 'center', paddingTop: scale(7) }}>
            <Icon style={{ flex: 1 }} name={'headset'} size={scale(30)} color={"#099FFF"} />
            <Text style={{ fontSize: scale(12), paddingBottom: scale(30), textAlign: 'center' }}>Chat hỗ trợ</Text>
          </TouchableOpacity>
        </View>
      </View>

    );
  }
}
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ee2797',
    width: containerW + scale(20),
    height: containerH / 5,
    borderBottomEndRadius: scale(27),
    borderBottomStartRadius: scale(27),
    alignItems: 'center'


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
  },
  service: {
    width: containerW / 1.08,
    height: containerH / 5.6,
    flexDirection: 'row',
    marginTop: '2%',
    backgroundColor: 'white'

  },

});
export default HomeScreen;