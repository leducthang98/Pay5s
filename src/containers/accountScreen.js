import React from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { scale } from '../configs/scale'
class AccountScreen extends React.Component {
  render() {
    let money = 10000000;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold' }}>Tài khoản</Text>
        </View>
        <View style={styles.body1}>
          <TouchableOpacity style={{ flex: 1, flexDirection: 'row', marginBottom: scale(5), alignItems: 'center', justifyContent: 'center' }}>
            <Image style={{ flex: 2.5, paddingLeft: scale(3), paddingLeft: '2.7%', paddingTop: '0.4%' }}
              source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
            />
            <View style={{ flex: 8, justifyContent: 'flex-start', flexDirection: 'column' }}>
              <Text style={{ fontSize: scale(18) }}>Le Duc Thang</Text>
              <Text style={{ fontSize: scale(12), color: 'gray' }}>0394827798</Text>
            </View>
            <Icon style={{ flex: 0.6 }} name={'chevron-right'} size={scale(16)} color={"gray"} />
          </TouchableOpacity>
        </View>
        <View style={styles.body2}>
          <TouchableOpacity style={{ flex: 1, flexDirection: 'row', marginBottom: scale(5), alignItems: 'center', justifyContent: 'center' }}>
            <Icon style={{ flex: 1, paddingLeft: scale(3), paddingLeft: '2.7%', paddingTop: '0.4%' }} name={'coins'} size={scale(28)} color={"gold"} />
            <View style={{ flex: 8, justifyContent: 'flex-start', flexDirection: 'row' }}>
              <Text>Số dư Pay5s: </Text>
              <Text style={{ color: "purple", fontWeight: 'bold' }}>10.000.000đ</Text>
            </View>
            <Icon style={{ flex: 0.5 }} name={'chevron-right'} size={scale(16)} color={"gray"} />
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, flexDirection: 'row', borderTopColor: '#ffe6ea', borderTopWidth: 0.4, alignItems: 'center', justifyContent: 'center' }}>
            <Icon style={{ flex: 1, paddingLeft: scale(3), paddingLeft: '2.7%', paddingTop: '1%' }} name={'comment-dots'} size={scale(28)} color={"#099FFF"} />
            <View style={{ flex: 8 }}>
              <View style={{ flex: 8, justifyContent: 'flex-start', flexDirection: 'row' }}>
                <Text>Mã giới thiệu: </Text>
                <Text style={{ color: "#099FFF", fontWeight: 'bold' }}>0394827798</Text>
              </View>
              <Text style={{ fontSize: scale(12) }} >Giới thiệu bạn tham gia Pay5s - App và nhận thưởng</Text>
            </View>
            <Icon style={{ flex: 0.5 }} name={'chevron-right'} size={scale(16)} color={"gray"} />
          </TouchableOpacity>


        </View>
        <View style={styles.body3}>

          <TouchableOpacity style={{ flex: 1, flexDirection: 'row', marginBottom: scale(5), alignItems: 'center', justifyContent: 'center' }}>
            <Icon style={{ flex: 1, paddingLeft: scale(3), paddingLeft: '2.7%', paddingTop: '1%' }} name={'facebook'} size={scale(28)} color={"#4876FF"} />
            <View style={{ flex: 8 }}>
              <Text>Fanpage Pay5s</Text>
              <Text style={{ fontSize: scale(12), }} >Facebook Fanpage chăm sóc khách hàng</Text>
            </View>
            <Icon style={{ flex: 0.5 }} name={'chevron-right'} size={scale(16)} color={"gray"} />

          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, flexDirection: 'row', borderTopColor: '#ffe6ea', borderTopWidth: 0.4, alignItems: 'center', justifyContent: 'center' }}>
            <Icon style={{ flex: 1, paddingLeft: scale(3), paddingLeft: '2.7%', paddingTop: '1%' }} name={'handshake'} size={scale(28)} color={"purple"} />
            <View style={{ flex: 8 }}>
              <Text>Về Pay5s - Điều khoản sử dụng</Text>
              <Text style={{ fontSize: scale(12) }} >Điều khoản sử dụng</Text>
            </View>
            <Icon style={{ flex: 0.5 }} name={'chevron-right'} size={scale(16)} color={"gray"} />

          </TouchableOpacity>

        </View>
        <View style={styles.body4}>
          <Icon style={{ flex: 1, paddingLeft: scale(3), marginLeft: '1.7%' }} name={'question-circle'} size={scale(28)} color={"#58dbdd"} />
          <View style={{ flex: 8, position: 'absolute', paddingBottom: '1%' }}>
            <Text>Thông tin ứng dụng</Text>
            <Text style={{ fontSize: scale(12) }} >Sản phẩm của Pay5s - Phiên bản hiện tại: 1.0.2</Text>
          </View>
        </View>
      </View>
    );
  }
}
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    width: containerW,
    height: containerH,
    alignItems: 'center'
  },
  header: {
    width: containerW,
    height: containerH / 13,
    backgroundColor: '#ee2797',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body1: {
    width: containerW,
    height: containerH / 6.7,
    marginTop: '2%',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  body2: {
    backgroundColor: 'white',
    width: containerW,
    height: containerH / 6.7,
    marginTop: '2%',
    flexDirection: 'column',
  },
  body3: {
    backgroundColor: 'white',
    width: containerW,
    height: containerH / 6.7,
    marginTop: '2%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body4: {
    backgroundColor: 'white',
    width: containerW,
    height: containerH / 14,
    marginTop: '2%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
})
export default AccountScreen;