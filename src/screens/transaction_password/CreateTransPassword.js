import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions, Keyboard } from 'react-native';
import { PRIMARY_COLOR, GRAY_FONTCOLOR } from '../../constant/Colors';
import Header from '../../components/common/Header';
import { scale, scaleVertical, scaleModerate } from '../../constant/Scale';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import { createTransPassword } from '../../fetchAPIs/AuthApi';
import LoadingDialog from '../../components/common/LoadingDialog';
import MessageDialog from '../../components/common/MessageDialog';
import { getAccountInfo } from '../../actions/ActionHomeScreen';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import { LOGIN } from '../../navigators/RouteName';
import LinearGradient from 'react-native-linear-gradient';
class CreateTransPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            repeatPassword: '',
            isLoading: false,
            responseError: null,
            isTokenExpired: false,
        };
    }
    async CreateTransPassword() {
        var validatePassword = this.validatePassword(this.state.password, this.state.repeatPassword)
        if (validatePassword == 'OK') {
            this.setState({ isLoading: true });
            let password = this.state.password;
            const token_user = await AsyncStorage.getItem('access_token')
            const response = await createTransPassword(password, token_user);
            this.setState({ isLoading: false });
            if (!response) {
                this.setState({ responseError: { message: getString('UNKNOWN_ERROR') } });
            } else if (response.errorCode !== 200) {
                if (response.message === 'InvalidToken') {
                    this.setState({
                        ...this.state,
                        isTokenExpired: true
                    })
                }
                else {
                    this.setState({ responseError: response })
                }
            } else {
                this._createTransPasswordSuccess(response, token_user);
            }


        } else {
            Toast.show(validatePassword)
        }
    }
    async _createTransPasswordSuccess(response) {
        Toast.show('Tạo mật khẩu giao dịch thành công');
        const token_user = await AsyncStorage.getItem('access_token')
        this.props.getAccountInfo(token_user)
        this.props.navigation.pop();
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
    async tokenInvalidFunction() {
        await AsyncStorage.clear();
        Toast.show("Phiên đăng nhập đã hết hạn, bạn sẽ được quay trở về trang đăng nhập.")
        this.props.navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [{ name: LOGIN }],
            })
        );
    }
    render() {
        if (!this.state.isTokenExpired) {
            return (
                <TouchableOpacity style={{ width: '100%', height: '100%' }}
                activeOpacity={1}
                onPress={() => Keyboard.dismiss()}>
                    <Header title={'Tạo mật khẩu giao dịch'} back={true} navigation={this.props.navigation} />
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 3.5, justifyContent: 'center', alignItems: 'center' }}>
                        <TextInput
                            onChangeText={(password) => this.setState({ password })}
                            placeholder="Nhập mật khẩu"
                            secureTextEntry={true}
                            keyboardType="number-pad"
                            maxLength={4}
                            style={styles.inputStyle}>
                        </TextInput>
                        <TextInput
                            onChangeText={(repeatPassword) => this.setState({ repeatPassword })}
                            placeholder="Xác nhận mật khẩu"
                            secureTextEntry={true}
                            keyboardType="number-pad"
                            maxLength={4}
                            style={styles.inputStyle}>
                        </TextInput>
                    </View>
                    <View style={{ flex: 5, width: '100%', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => this.CreateTransPassword()}
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
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: scaleModerate(14) }}>Xác nhận</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.isLoading && <LoadingDialog />
                    }
                    {

                        this.state.responseError !== null ? <MessageDialog
                            message={this.state.responseError.descripiton ? this.state.responseError.descripiton : this.state.responseError.message}
                            close={() => {
                                this.setState({ responseError: null });
                            }}
                        /> : null
                    }
                </TouchableOpacity>
            );
        }
        else if (this.state.isTokenExpired) {
            this.tokenInvalidFunction();
            return null;
        }
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
        marginBottom: scale(15),
        paddingVertical: scaleVertical(10),
        paddingHorizontal: scaleModerate(0),
    }
})

const mapStateToProps = (store) => {
    return {

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAccountInfo: (token_user) => {
            dispatch(getAccountInfo(token_user))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateTransPassword);
