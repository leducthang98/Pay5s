import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Dimensions, StyleSheet, Image } from 'react-native';
import { scaleVertical, scale, scaleModerate } from '../../constant/Scale';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import { PRIMARY_COLOR } from '../../constant/Colors';
import { requestOtpTrans, resetTransKey } from '../../fetchAPIs/AuthApi';
import { CommonActions } from '@react-navigation/native';
import { LOGIN, TRANS_PASSWORD_SCREEN } from '../../navigators/RouteName';
import { connect } from 'react-redux';
import { refreshStore } from '../../actions/ActionRefresh';
import LoadingDialog from '../../components/common/LoadingDialog';
import MessageDialog from '../../components/common/MessageDialog';
import { statusBarHeight } from '../../constant/Layout';
import LinearGradient from 'react-native-linear-gradient';
class GetOTPForgetTransPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            otp: '',
            isLoading: false,
            responseError: null,
            isTokenExpired: false,
        };
    }
    async componentDidMount() {
        let mobile = 0 + this.props.route.params.mobile
        const token_user = await AsyncStorage.getItem('access_token');
        const response = await requestOtpTrans(token_user);
        console.log(response)
        if (!response) {
            this.setState({ responseError: { message: getString('UNKNOWN_ERROR') } });
        } else if (response.errorCode !== 200) {
            if (response.errorCode === 500) {
                //Token expired
                this.setState(
                    {
                        ...this.state,
                        isTokenExpired: true
                    }
                )

            }
        } else {
            Toast.show("MÃ OTP SẼ ĐƯỢC GỬI TỚI SỐ ĐIỆN THOẠI " + mobile + ". VUI LÒNG ĐỢI...");

        }
    }
    async tokenInvalidFunction() {
        this.props.refreshStore();
        await AsyncStorage.clear();
        Toast.show("Phiên đăng nhập đã hết hạn, bạn sẽ được quay trở về trang đăng nhập.")
        this.props.navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [{ name: LOGIN }],
            })
        );
    }
    async commitResetTransPassword() {
        this.setState({ isLoading: true });
        let new_password = this.props.route.params.new_password;
        const token_user = await AsyncStorage.getItem('access_token');
        const response = await resetTransKey(this.state.otp, new_password, token_user);
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
                this.setState({
                    responseError: response
                })
            }

        } else {
            Toast.show("CẬP NHẬT THÀNH CÔNG MẬT KHẨU GIAO DỊCH");
            this.props.navigation.navigate(TRANS_PASSWORD_SCREEN);
        }
    }
    render() {
        if (!this.state.isTokenExpired) {
            return (
                <>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ width: '100%', height: '30%' }}>
                            <Image
                                style={{ width: '100%', height: '100%' }}
                                resizeMode={'cover'}
                                source={require('../../res/images/common/login.png')}
                            />
                        </View>
                        <View style={{ width: '100%', height: '60%', alignItems: 'center', justifyContent: 'flex-start', paddingTop: scaleVertical(30) }}>
                            <TextInput
                                onChangeText={(otp) => this.setState({ otp })}
                                placeholder="ENTER OTP HERE"
                                secureTextEntry={true}
                                maxLength={4}
                                keyboardType="number-pad"
                                style={styles.inputStyle} />
                            <TouchableOpacity
                                onPress={() => this.commitResetTransPassword()}
                                disabled={this.state.otp ? false : true}
                                style={{ marginTop: scale(30) }}
                            >
                                <LinearGradient
                                    start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }}

                                    colors={['#ff547c', '#c944f7']}
                                    style={{
                                        width: containerW * 0.7,
                                        height: scale(45),
                                        backgroundColor: PRIMARY_COLOR,
                                        borderRadius: scaleModerate(40),
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <Text style={{ color: (this.state.otp) ? 'white' : '#C4CACE', fontWeight: 'bold', fontSize: scaleModerate(14) }}>Xác nhận</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.pop()}
                            >
                                <Text style={{ color: PRIMARY_COLOR, fontWeight: 'bold', marginTop: scaleVertical(10), fontSize: scale(15) }}>Quay lại</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {
                        this.state.isLoading && <LoadingDialog />
                    }
                    {

                        this.state.responseError !== null ? <MessageDialog
                            message={this.state.responseError.descripiton}
                            close={() => {
                                this.setState({ responseError: null });
                            }}
                        /> : null
                    }
                </>
            );
        } else {
            this.tokenInvalidFunction()
            return null;
        }
    }

}
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
const styles = StyleSheet.create({
    inputStyle: {
        marginTop: scale(10),
        borderBottomWidth: scale(0.5),
        borderColor: 'gray',
        borderRadius: scaleModerate(10),
        width: '80%',
        paddingVertical: scaleVertical(10),
        paddingHorizontal: scaleModerate(0),
        justifyContent: 'center',
        fontSize: scaleModerate(15),
        textAlign: 'center',
    }

})

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
export default connect(mapStateToProps, mapDispatchToProps)(GetOTPForgetTransPassword);