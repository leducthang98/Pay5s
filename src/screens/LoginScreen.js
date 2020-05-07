import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Dimensions, Keyboard, Image } from 'react-native';
import { BOTTOM_TAB, HOME, REGISTER, FORGET_PASSWORD } from '../navigators/RouteName';
import { scale, scaleVertical, scaleModerate } from '../constant/Scale';
import { PRIMARY_COLOR, ERROR } from '../constant/Colors';
import LoadingDialog from '../components/common/LoadingDialog';
import { login } from '../fetchAPIs/AuthApi';
import { getString } from '../res/values/String';
import AsyncStorage from '@react-native-community/async-storage';
import MessageDialog from '../components/common/MessageDialog';
import Header from '../components/common/Header'
import { statusBarHeight } from '../constant/Layout';
import { connect } from 'react-redux';
import { refreshStore } from '../actions/ActionRefresh';
import OneSignal from 'react-native-onesignal';
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      usernameError: false,
      passwordError: false,
      isLoading: false,
      responseError: null,
    };
    OneSignal.deleteTag('mobile')
  }
  componentDidMount() {
    setTimeout(() => this.props.refreshStore(), 2000)
  }
  async _loginFunction() {
    Keyboard.dismiss();
    const { username, password } = this.state;
    this.setState({ isLoading: true });
    let mobile = username.substring(1);
    const response = await login(mobile, password);
    this.setState({ isLoading: false });
    console.log('response in screen = ', response);
    if (!response) {
      this.setState({ responseError: { message: getString('UNKNOWN_ERROR') } });
    } else if (response && response.data?.errorCode !== 200) {
      this.setState({ responseError: response });
    } else {
      this._loginSuccess(response);
    }
  }

  async _loginSuccess(response) {
    const access_token = response.data.data.token;
    await AsyncStorage.setItem('access_token', access_token);
    this.props.navigation.navigate(BOTTOM_TAB)
  }

  _processUsername(username) {
    const isValidUsername = username && !username.includes(' ');
    this.setState({
      username: username,
      usernameError: !isValidUsername,
    });
  }

  _processPassword(password) {
    const isValidPassword = password && password.length >= 6;
    this.setState({
      password: password,
      passwordError: !isValidPassword,
    });
  }

  render() {
    const inputStyleUser = [{
      borderTopLeftRadius: scale(3),
      borderTopRightRadius: scale(3),
      borderLeftWidth: scale(0.7),
      borderTopWidth: scale(0.7),
      borderRightWidth: scale(0.7),
      borderBottomWidth: scale(0.7),
      borderColor: 'gray',
      width: '90%',
      paddingVertical: scaleVertical(10),
      paddingHorizontal: scaleModerate(15),
      justifyContent: 'center',
      fontSize: scaleModerate(14),
    }];
    const inputStylePass = [{
      borderBottomLeftRadius: scale(3),
      borderBottomRightRadius: scale(3),
      borderLeftWidth: scale(0.7),
      borderRightWidth: scale(0.7),
      borderBottomWidth: scale(0.7),
      borderColor: 'gray',
      width: '90%',
      paddingVertical: scaleVertical(10),
      paddingHorizontal: scaleModerate(15),
      justifyContent: 'center',
      fontSize: scaleModerate(14),
    }];
    const inputErrorStyleUser = [...inputStyleUser, { borderWidth: 1, borderColor: ERROR }];
    const inputErrorStylePass = [...inputStylePass, { borderWidth: 1, borderColor: ERROR }];
    return (
      <>
        {/* <View style={{ height: statusBarHeight, backgroundColor: PRIMARY_COLOR }}></View> */}
        <View style={{ flex: 4, alignItems: 'center', backgroundColor: 'white' }}>
          <View style={{ width: '100%', height: '30%' }}>
            <Image
              style={{ width: '100%', height: '100%' }}
              resizeMode={'cover'}
              source={{
                uri: 'https://client.pay5s.com/assets/img/banner_default.jpg'
              }}
            />
          </View>
          <View style={{ width: '100%', height: '5%' }} />

          <TextInput
            onChangeText={(username) => this._processUsername(username)}
            placeholder="Số điện thoại"
            textAlign='left'
            keyboardType="number-pad"
            style={this.state.usernameError ? inputErrorStyleUser : inputStyleUser} />
          <TextInput
            onChangeText={(password) => this._processPassword(password)}
            placeholder="Mật khẩu"
            textAlign='left'
            secureTextEntry={true}
            style={this.state.passwordError ? inputErrorStylePass : inputStylePass} />
          <View style={{ width: '100%', height: '2%' }} />
          <TouchableOpacity
            onPress={async () => this._loginFunction()}
            disabled={(!this.state.username) ? true : false}
          >
            <View style={{
              width: containerW * 0.9,
              height: scale(45),
              backgroundColor: PRIMARY_COLOR,
              borderRadius: scaleModerate(8),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{ color: ((!this.state.username) ? '#DCDCDC' : 'white'), fontWeight: 'bold', fontSize: scaleModerate(14) }}>Đăng nhập</Text>
            </View>
          </TouchableOpacity>
          <View style={{ width: '100%', height: '2%' }} />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(FORGET_PASSWORD)}
          >

            <Text style={{ color: PRIMARY_COLOR, fontWeight: 'bold', fontSize: scaleModerate(14) }}>Quên mật khẩu?</Text>

          </TouchableOpacity>

        </View>
        <View style={{ flex: 1, backgroundColor: 'white', paddingBottom: scaleVertical(30) }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: scale(60), height: scale(0.4), backgroundColor: 'gray' }}></View>
            <Text style={{ fontSize: scaleModerate(14) }}> HOẶC </Text>
            <View style={{ width: scale(60), height: scale(0.4), backgroundColor: 'gray' }}></View>
          </View>
          <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate(REGISTER)}
            >
              <View style={{
                width: containerW * 0.9,
                height: scale(45),
                backgroundColor: '#DCDCDC',
                borderRadius: scaleModerate(4),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Text style={{ color: PRIMARY_COLOR, fontWeight: 'bold', fontSize: scaleModerate(14) }}>Tạo tài khoản mới</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
        {
          this.state.isLoading && <LoadingDialog />
        }
        {
          this.state.responseError !== null ? <MessageDialog
            message={this.state.responseError.data?.descripiton}
            close={() => {
              this.setState({ responseError: null });
            }}
          /> : null
        }
      </>
    );
  }
}

const mapStateToProps = (store) => {
  return {

  }
}
const mapDispatchToProps = (dispatch) => {
  return {

    refreshStore: () => {
      dispatch(refreshStore())
    },


  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);