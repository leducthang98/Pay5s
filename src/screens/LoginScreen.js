import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Dimensions, Keyboard, Image, StyleSheet,Platform,SafeAreaView } from 'react-native';
import { BOTTOM_TAB, HOME, REGISTER, FORGET_PASSWORD } from '../navigators/RouteName';
import { scale, scaleVertical, scaleModerate } from '../constant/Scale';
import { PRIMARY_COLOR, ERROR, GRAY_FONTCOLOR } from '../constant/Colors';
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
import LinearGradient from 'react-native-linear-gradient';

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
      borderBottomWidth: scale(0.5),
      borderColor: GRAY_FONTCOLOR,
      width: '80%',
      justifyContent: 'center',
      fontSize: scaleModerate(15),
      textAlign: 'center',
      paddingVertical: scaleVertical(10),
      paddingHorizontal: scaleModerate(0),
      
    }];
    const inputStylePass = [{
      borderBottomWidth: scale(0.5),
      borderColor: GRAY_FONTCOLOR,
      width: '80%',
      justifyContent: 'center',
      fontSize: scaleModerate(15),
      textAlign: 'center',
      marginTop: scale(10),
      paddingVertical: scaleVertical(10),
      paddingHorizontal: scaleModerate(0),
    }];
    const inputErrorStyleUser = [...inputStyleUser, { borderColor: ERROR }];
    const inputErrorStylePass = [...inputStylePass, { borderColor: ERROR }];
    return (
      <SafeAreaView style={{flex:1}}>
        {/* <View style={{ height: statusBarHeight, backgroundColor: PRIMARY_COLOR }}></View> */}
        {/* {
          Platform.OS ==='ios'?<View 
          style={{width:containerW,height:statusBarHeight}}/>:null
        } */}
        <View style={{ flex: 4, alignItems: 'center', backgroundColor: 'white' }}>
          <View style={{ width: '100%', height: '30%' }}>
            <Image
              style={{ width: '100%', height: '100%' }}
              resizeMode={'cover'}
              source={require('../res/images/common/login.png')}
            />
          </View>
          <Text style={styles.largeText}>Đăng nhập</Text>
          <View style={{ width: '100%', height: '4%' }} />
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
          <View style={{ width: '100%', height: '5%' }} />
          <TouchableOpacity
            onPress={async () => this._loginFunction()}
            disabled={(!this.state.username) ? true : false}
          >
            <LinearGradient
              start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }}

              colors={['#ff547c', '#c944f7']}
              style={{
                width: containerW * 0.6,
                height: scale(45),
                backgroundColor: PRIMARY_COLOR,
                borderRadius: scaleModerate(40),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ color: ((!this.state.username) ? '#DCDCDC' : 'white'), fontWeight: 'bold', fontSize: scaleModerate(16) }}>Đăng nhập</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={{ width: '100%', height: '3%' }} />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(FORGET_PASSWORD)}
          >

            <Text style={{ color: GRAY_FONTCOLOR, fontWeight: 'normal', fontSize: scaleModerate(14) }}>Quên mật khẩu?</Text>

          </TouchableOpacity>

        </View>
        <View style={{ flex: 1, backgroundColor: 'white', paddingBottom: scaleVertical(30) }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: scaleModerate(16), color: GRAY_FONTCOLOR }}> HOẶC </Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: scale(15) }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate(REGISTER)}
            >
              <LinearGradient
                start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }}

                colors={['#ff547c', '#c944f7']}
                style={{
                  width: containerW * 0.6,
                  height: scale(40),
                  borderRadius: scaleModerate(30),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: '98%',
                    height: '90%',
                    borderRadius: scaleModerate(9999),
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white'
                  }}>

                  <Text style={{ color: GRAY_FONTCOLOR, fontWeight: 'normal', fontSize: scaleModerate(14) }}>Tạo tài khoản mới</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

        </View>
        {
          this.state.isLoading && <LoadingDialog />
        }
        {
          this.state.responseError !== null ? <MessageDialog
            message={this.state.responseError.data?.descripiton ? this.state.responseError.data?.descripiton : this.state.responseError.data.message}
            close={() => {
              this.setState({ responseError: null });
            }}
          /> : null
        }
      </SafeAreaView>
    );
  }
}
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
const styles = StyleSheet.create({
  largeText: {
    color: GRAY_FONTCOLOR,
    fontSize: scale(16)

  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },

});
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