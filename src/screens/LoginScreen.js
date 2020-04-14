import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { BOTTOM_TAB } from '../navigators/RouteName';
import { scale, scaleVertical, scaleModerate } from '../constant/Scale';
import { PRIMARY_COLOR } from '../constant/Colors';

const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''

    }

  }
  loginFunction() {
    console.log("username:" + this.state.username);
    console.log("password:" + this.state.password);
  }
  render() {
    return (
      <>
        <View style={{ flex: 8, alignItems: 'center', backgroundColor: 'white' }}>
          <View style={{ width: '100%', height: '30%', backgroundColor: PRIMARY_COLOR }}>
          </View>
          <View style={{ width: '100%', height: '5%' }} />

          <TextInput
            onChangeText={(username) => this.setState({ username })}
            placeholder="Tên đăng nhập"
            textAlign='left'
            style={{ borderTopLeftRadius: scale(3), borderTopRightRadius: scale(3), borderLeftWidth: scale(0.4), borderTopWidth: scale(0.7), borderRightWidth: scale(0.4), borderColor: 'gray', width: "90%", paddingVertical: scaleVertical(10), paddingHorizontal: scaleModerate(15), justifyContent: 'center', fontSize: scaleModerate(12) }} />
          <TextInput
            onChangeText={(password) => this.setState({ password })}
            placeholder="Mật khẩu"
            textAlign='left'
            secureTextEntry={true}
            style={{ borderBottomLeftRadius: scale(3), borderBottomRightRadius: scale(3), borderLeftWidth: scale(0.4), borderTopWidth: scale(0.7), borderRightWidth: scale(0.4), borderBottomWidth: scale(0.7), borderColor: 'gray', width: "90%", paddingVertical: scaleVertical(10), paddingHorizontal: scaleModerate(15), justifyContent: 'center', fontSize: scaleModerate(12) }} />
          <View style={{ width: '100%', height: '2%' }} />
          <TouchableOpacity
            onPress={() => this.loginFunction()}
            disabled={(!this.state.username) ? true : false}
          >
            <View style={{ width: containerW * 0.9, height: scale(31), backgroundColor: PRIMARY_COLOR, borderRadius: scaleModerate(4), alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: ((!this.state.username) ? '#DCDCDC' : 'white'), fontWeight: 'bold' }}>Đăng nhập</Text>
            </View>
          </TouchableOpacity>
          <View style={{ width: '100%', height: '1%' }} />
          <TouchableOpacity>

            <Text style={{ color: PRIMARY_COLOR, fontWeight: 'bold' }}>Quên mật khẩu?</Text>

          </TouchableOpacity>

        </View>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: scale(60), height: scale(1), backgroundColor: 'gray' }}></View>
            <Text style={{ fontSize: scaleModerate(11.5) }}>  HOẶC  </Text>
            <View style={{ width: scale(60), height: scale(0.4), backgroundColor: 'gray' }}></View>
          </View>
          <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity>
              <View style={{ width: containerW * 0.9, height: scale(31), backgroundColor: '#DCDCDC', borderRadius: scaleModerate(4), alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: PRIMARY_COLOR, fontWeight: 'bold' }}>Tạo tài khoản mới</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
      </>
    );
  }
}
export default LoginScreen;
