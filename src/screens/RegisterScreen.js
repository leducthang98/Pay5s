import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import Header from '../components/common/Header';
import { PRIMARY_COLOR, GRAY_FONTCOLOR } from '../constant/Colors';
import { scaleVertical, scale, scaleModerate } from '../constant/Scale';
import { OTP } from '../navigators/RouteName';
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';
class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
            password: '',
            repeatPassword: ''
        };
    }
    registFunction() {
        var validatePhoneNumber = this.validatePhoneNumber(this.state.mobile);
        var validatePassword = this.validatePassword(this.state.password, this.state.repeatPassword)
        if (validatePassword == 'OK' && validatePhoneNumber == 'OK') {
            this.props.navigation.navigate
                (OTP, {
                    mobile: this.state.mobile,
                    password: this.state.password
                });
        } else {
            if (validatePhoneNumber == 'OK') {
                Toast.show(validatePassword)
            } else if (validatePassword == 'OK') {
                Toast.show(validatePhoneNumber)
            } else {
                Toast.show(validatePhoneNumber)
            }
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
    validatePassword(password, repeatPassword) {
        if (password == repeatPassword) {
            if (password.length >= 6) {
                return 'OK'
            } else {
                return 'Mật khẩu phải trên 6 ký tự'
            }
        } else {
            return 'Mật khẩu và mật khẩu xác nhận không khớp.'
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header navigation={this.props.navigation} back={false} title={'Đăng ký tài khoản'} />
                <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 3.5, width: "100%", alignItems: 'center' }}>
                        <TextInput
                            onChangeText={(mobile) => this.setState({ mobile })}
                            placeholder="Nhập số điện thoại"
                            keyboardType="number-pad"
                            style={styles.inputStyle} />

                        <TextInput
                            onChangeText={(password) => this.setState({ password })}
                            placeholder="Nhập mật khẩu"
                            secureTextEntry={true}
                            style={styles.inputStyle}></TextInput>
                        <TextInput
                            onChangeText={(repeatPassword) => this.setState({ repeatPassword })}
                            secureTextEntry={true}
                            placeholder="Xác nhận mật khẩu"
                            style={styles.inputStyle}></TextInput>
                    </View>
                    <View style={{ flex: 5, width: '100%', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => this.registFunction()}
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
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: scaleModerate(14) }}>Đăng ký</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.pop()}
                        >
                            <Text style={{ color: PRIMARY_COLOR, fontWeight: 'bold', marginTop: scaleVertical(25), fontSize: scale(14) }}>Quay lại</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
const styles = StyleSheet.create({
    inputStyle: {
        borderBottomWidth: scale(0.5),
        borderColor: GRAY_FONTCOLOR,
        width: '80%',
        justifyContent: 'center',
        fontSize: scaleModerate(13),
        marginBottom: scale(15)
    }


})
export default RegisterScreen;
