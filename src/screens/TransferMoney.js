import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Dimensions, StyleSheet } from 'react-native';
import Header from '../components/common/Header';
import { scale, scaleModerate, scaleVertical } from '../constant/Scale';
import * as COLOR from '../constant/Colors';
import { formatMoney } from '../constant/CommonFormat';
import Toast from 'react-native-simple-toast';
import { TRANS_PASSWORD_SCREEN, COMMIT_TRANSFER } from '../navigators/RouteName';
class TransferMoney extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      amount: '',
      transPassword: '',
    };
  }
  _navigateToCommitTransfer() {
    var validatePhoneNumber = this.validatePhoneNumber(this.state.mobile);
    if (validatePhoneNumber === 'OK') {
      this.props.navigation.navigate(COMMIT_TRANSFER, {
        dataTransfer: {
          mobile: this.state.mobile,
          amount: this.state.amount,
          transPassword: this.state.transPassword
        }
      })
    } else {
      Toast.show(validatePhoneNumber)
    }
  }
  validatePhoneNumber(mobile) {
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (vnf_regex.test(mobile)) {
      return 'OK'
    } else {
      return 'Số điện thoại không hợp lệ.'
    }
  }
  render() {
    return (
      <>
        <Header navigation={this.props.navigation} back={true} title={'Chuyển khoản'} />
        <View style={{ width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'center', paddingTop: scaleVertical(20) }}>
          <View style={{ paddingTop: scale(20), paddingLeft: scale(10), width: '90%', height: '60%', backgroundColor: 'white', borderRadius: scale(10) }}>
            <Text style={styles.textStyle}>Nạp đến:</Text>
            <TextInput
              onChangeText={(mobile) => this.setState({ mobile })}
              placeholder={'Phone Number'}
              maxLength={12}
              keyboardType="number-pad"
              style={styles.inputStyle}></TextInput>
            <Text style={styles.textStyle}>Nhập số tiền:</Text>
            <TextInput
              onChangeText={(amount) => this.setState({ amount })}
              placeholder={'Amount'}
              maxLength={10}
              keyboardType="number-pad"
              style={styles.inputStyle}></TextInput>
            <Text style={{ marginTop: scale(10), marginLeft: scale(1), color: COLOR.FACEBOOK, fontSize: scale(15) }}>{(this.state.amount) ? (formatMoney(this.state.amount) + ' VNĐ') : '0 VNĐ'} </Text>
            <Text style={styles.textStyle}>Nhập mật khẩu giao dịch:</Text>
            <TextInput
              onChangeText={(transPassword) => this.setState({ transPassword })}
              maxLength={4}
              secureTextEntry={true}
              keyboardType="number-pad"
              placeholder={'Transaction Password'}
              style={styles.inputStyle}></TextInput>

          </View>
          <View style={{ flexDirection: 'row', width: '100%', height: '10%', marginTop: scale(10), justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.pop()}
              style={{ height: '70%', width: '43%', backgroundColor: '#C0C0C0', borderRadius: scale(20), justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: scale(15), color: 'white' }}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this._navigateToCommitTransfer()}
              disabled={(this.state.amount && this.state.mobile && this.state.transPassword) ? false : true}
              style={{ height: '70%', width: '43%', backgroundColor: COLOR.PRIMARY_COLOR, marginLeft: scale(10), borderRadius: scale(20), justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: scale(15), color: (this.state.amount && this.state.mobile && this.state.transPassword) ? 'white' : '#C0C0C0' }}>Tiếp tục</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(TRANS_PASSWORD_SCREEN)}>
            <Text style={{ fontSize: scale(15), marginTop: scaleVertical(20), textDecorationLine: 'underline', fontWeight: 'bold', color: COLOR.PRIMARY_COLOR }}>Quản lý mật khẩu giao dịch</Text>
          </TouchableOpacity>
        </View>

      </>
    );
  }
}
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
const styles = StyleSheet.create({
  inputStyle: {
    marginTop: scale(5),
    borderBottomWidth: scale(0.5),
    borderColor: 'gray',
    borderRadius: scaleModerate(3),
    width: '95%',
    paddingVertical: scaleVertical(10),
    paddingHorizontal: scaleModerate(0),
    justifyContent: 'center',
    fontSize: scaleModerate(15),
    textAlign: 'left',
  },
  textStyle: {
    fontSize: scale(15),
    fontWeight: 'bold',
    color: COLOR.PRIMARY_COLOR,
    marginTop: scale(10)
  },

})
export default TransferMoney;
