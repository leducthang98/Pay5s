import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Dimensions, StyleSheet } from 'react-native';
import Header from '../../components/common/Header'
import { scaleVertical, scale, scaleModerate } from '../../constant/Scale';
import Toast from 'react-native-simple-toast';
import { PRIMARY_COLOR } from '../../constant/Colors';
import { GETOTP_FORGET_TRANS_PASSWORD } from '../../navigators/RouteName';
class ForgetTransPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            repeatPassword: ''
        };
    }
    validatePassword(password, repeatPassword) {
        if (password == repeatPassword) {
            if (password.length < 4) {
                return 'Mật khẩu phải có 4 ký tự'
            } else {
                return 'OK'
            }
        } else {
            return 'Mật khẩu và mật khẩu xác nhận không khớp.'
        }
    }
    onClickGetOTP() {
        var validatePassword = this.validatePassword(this.state.password, this.state.repeatPassword)
        if (validatePassword == 'OK') {
            this.props.navigation.navigate(GETOTP_FORGET_TRANS_PASSWORD, {
                mobile: this.props.route.params.mobile,
                new_password: this.state.password
            });
        } else {
            Toast.show(validatePassword)
        }
    }
    render() {
        return (
            <>
                <Header title={'Quên mật khẩu giao dịch'} back={true} navigation={this.props.navigation} />
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 3.5, alignItems: "center", justifyContent: 'flex-start' }}>
                    <TextInput
                        onChangeText={(password) => this.setState({ password })}
                        style={styles.inputStyle}
                        secureTextEntry={true}
                        keyboardType="number-pad"
                        maxLength={4}
                        placeholder={'Nhập mật khẩu mới'}
                    />
                    <TextInput
                        onChangeText={(repeatPassword) => this.setState({ repeatPassword })}
                        style={styles.inputStyle}
                        secureTextEntry={true}
                        keyboardType="number-pad"
                        maxLength={4}
                        placeholder={'Xác nhận mật khẩu'}
                    />
                </View>
                <View style={{ flex: 5, width: '100%', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => this.onClickGetOTP()}
                    >
                        <View style={{
                            width: containerW * 0.4,
                            height: scale(45),
                            backgroundColor: PRIMARY_COLOR,
                            borderRadius: scaleModerate(10),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: scaleModerate(14) }}>Lấy mã OTP</Text>
                        </View>
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
        marginTop: scaleVertical(20),
        borderColor: 'black',
        width: '80%',
        paddingVertical: scaleVertical(10),
        paddingHorizontal: scaleModerate(0),
        justifyContent: 'center',
        fontSize: scaleModerate(15),
        borderRadius: scale(10),
        borderLeftWidth: scale(0.7),
        borderTopWidth: scale(0.7),
        borderRightWidth: scale(0.7),
        borderBottomWidth: scale(0.7),
        borderColor: 'gray',
        paddingLeft: scale(10)
    }

})
export default ForgetTransPassword;