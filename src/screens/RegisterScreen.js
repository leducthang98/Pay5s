import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import Header from '../components/common/Header';
import { PRIMARY_COLOR } from '../constant/Colors';
import { scaleVertical, scale, scaleModerate } from '../constant/Scale';
import { OTP } from '../navigators/RouteName';
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
        this.props.navigation.navigate
            (OTP, {
                mobile: this.state.mobile,
                password: this.state.password
            });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header navigation={this.props.navigation} back={false} title={'Đăng ký'} />
                <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 3.5, width: "100%", alignItems: 'center' }}>
                        <TextInput
                            onChangeText={(mobile) => this.setState({ mobile })}
                            placeholder="Số điện thoại*"
                            keyboardType="number-pad"
                            style={styles.inputStyle} />

                        <TextInput
                            onChangeText={(password) => this.setState({ password })}
                            placeholder="Mật khẩu*"
                            secureTextEntry={true}
                            style={styles.inputStyle}></TextInput>
                        <TextInput
                            onChangeText={(repeatPassword) => this.setState({ repeatPassword })}
                            secureTextEntry={true}
                            placeholder="Xác nhận mật khẩu*"
                            style={styles.inputStyle}></TextInput>
                    </View>
                    <View style={{ flex: 3, width: '100%', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => this.registFunction()}
                        >
                            <View style={{
                                width: containerW * 0.4,
                                height: scale(31),
                                backgroundColor: PRIMARY_COLOR,
                                borderRadius: scaleModerate(4),
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Đăng ký</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.pop()}
                        >
                            <Text style={{ color: PRIMARY_COLOR, fontWeight: 'bold', marginTop: scaleVertical(25), fontSize: scale(12) }}>Quay lại</Text>
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
        marginTop: scale(10),
        borderBottomWidth: scale(3),
        borderColor: PRIMARY_COLOR,
        width: '80%',
        paddingVertical: scaleVertical(10),
        paddingHorizontal: scaleModerate(0),
        justifyContent: 'center',
        fontSize: scaleModerate(15),
    }

})
export default RegisterScreen;
