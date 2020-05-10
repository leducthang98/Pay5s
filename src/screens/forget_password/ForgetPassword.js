import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Dimensions, StyleSheet } from 'react-native';
import Header from '../../components/common/Header';
import { scaleVertical, scaleModerate, scale } from '../../constant/Scale';
import { PRIMARY_COLOR, GRAY_FONTCOLOR } from '../../constant/Colors';
import Toast from 'react-native-simple-toast';
import { OTP_FORGET_PASSWORD } from '../../navigators/RouteName';
import LinearGradient from 'react-native-linear-gradient';
class ForgetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
            password: '',
            repeatPassword: ''
        };
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
                return 'Mật khẩu mới phải trên 6 ký tự'
            }
        } else {
            return 'Mật khẩu và mật khẩu xác nhận không khớp.'
        }
    }
    forgetPasswordFunction() {

        var validatePhoneNumber = this.validatePhoneNumber(this.state.mobile);
        var validatePassword = this.validatePassword(this.state.password, this.state.repeatPassword)
        if (validatePassword == 'OK' && validatePhoneNumber == 'OK') {
            this.props.navigation.navigate
                (OTP_FORGET_PASSWORD, {
                    forgetPasswordData: {
                        mobile: this.state.mobile,
                        password: this.state.password
                    }
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
    render() {
        return (
            <>
                <Header navigation={this.props.navigation} back={false} title={'Quên mật khẩu'} />
                <View style={{ flex: 3.5, alignItems: "center", justifyContent: 'center' }}>
                    <TextInput
                        onChangeText={(mobile) => this.setState({ mobile })}
                        style={styles.inputStyle}
                        keyboardType="number-pad"
                        placeholder={'Nhập số điện thoại'}
                    />
                    <TextInput
                        onChangeText={(password) => this.setState({ password })}
                        style={styles.inputStyle}
                        secureTextEntry={true}
                        placeholder={'Nhập mật khẩu mới'}
                    />
                    <TextInput
                        onChangeText={(repeatPassword) => this.setState({ repeatPassword })}
                        style={styles.inputStyle}
                        secureTextEntry={true}
                        placeholder={'Xác nhận mật khẩu'}
                    />
                </View>
                <View style={{ flex: 5, width: '100%', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => this.forgetPasswordFunction()}
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
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: scaleModerate(14) }}>Lấy mã OTP</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.pop()}
                        style={{ marginTop: scaleVertical(25)}}
                    >
                        <Text style={{ color: PRIMARY_COLOR, fontWeight: 'bold', fontSize: scale(15) }}>Quay lại</Text>
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
        borderBottomWidth: scale(0.5),
        borderColor: GRAY_FONTCOLOR,
        width: '80%',
        justifyContent: 'center',
        fontSize: scaleModerate(13),
        marginBottom: scale(15)
    }
})
export default ForgetPassword;
