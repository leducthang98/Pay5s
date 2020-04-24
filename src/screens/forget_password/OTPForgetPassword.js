import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { scaleModerate, scale, scaleVertical } from '../../constant/Scale';
import { PRIMARY_COLOR } from '../../constant/Colors';
import Toast from 'react-native-simple-toast';
import { getOTP,forgetPassword } from '../../fetchAPIs/AuthApi';
import LoadingDialog from '../../components/common/LoadingDialog';
import MessageDialog from '../../components/common/MessageDialog';
import { LOGIN } from '../../navigators/RouteName';
class OTPForgetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            otp: '',
            isLoading: false,
            responseError: null
        };
    }
    async componentDidMount() {
        let params = this.props.route.params;
        let mobile = params.forgetPasswordData.mobile;
        const respond = await getOTP(mobile);
    }
    async getOTP() {
        let params = this.props.route.params;
        let mobile = params.forgetPasswordData.mobile;
        const respond = await getOTP(mobile);
        Toast.show("ĐANG GỬI MÃ OTP, VUI LÒNG ĐỢI...");
    }
    async commitForgetPassOTP() {
        this.setState({ isLoading: true });
        let params = this.props.route.params;
        let mobile = params.forgetPasswordData.mobile;
        let password = params.forgetPasswordData.password;
        let otp = this.state.otp;
        const response = await forgetPassword(mobile, password, otp);
        this.setState({ isLoading: false });
        if (!response) {
            this.setState({ responseError: { message: getString('UNKNOWN_ERROR') } });
        } else if (response && response.data?.errorCode !== 200) {
            this.setState({ responseError: response });
        } else {
            this.commitForgetPassSuccess(response);
        }
    }
    async commitForgetPassSuccess(response) {
        Toast.show('Thay đổi mật khẩu thành công')
        this.props.navigation.navigate(LOGIN)
    }
    render() {


        return (
            <>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={{ width: '100%', height: '40%', backgroundColor: PRIMARY_COLOR }}></View>
                    <View style={{ width: '100%', height: '60%', alignItems: 'center', justifyContent: 'flex-start', paddingTop: scaleVertical(30) }}>
                        <TextInput
                            onChangeText={(otp) => this.setState({ otp })}
                            placeholder="ENTER OTP HERE"
                            secureTextEntry={true}
                            maxLength={4}
                            keyboardType="number-pad"
                            style={styles.inputStyle} />
                        <TouchableOpacity
                            onPress={() => this.commitForgetPassOTP()}
                        >
                            <View style={{
                                width: containerW * 0.8,
                                height: scale(45),
                                backgroundColor: PRIMARY_COLOR,
                                borderRadius: scaleModerate(4),
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: scale(30)
                            }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: scaleModerate(14) }}>Xác nhận</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: scale(20) }}>
                            <Text style={{ color: "black", fontWeight: 'bold', fontSize: scale(15) }}>Chưa nhận được mã OTP? </Text>
                            <TouchableOpacity
                                onPress={() => this.getOTP()}
                            >
                                <Text style={{ color: PRIMARY_COLOR, fontWeight: 'bold', fontSize: scale(15) }}>Thử lại.</Text>
                            </TouchableOpacity>
                        </View>
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
                        message={this.state.responseError.data.message}
                        close={() => {
                            this.setState({ responseError: null }); 
                        }}
                    /> : null
                }
            </>
        );
    }
}
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
const styles = StyleSheet.create({
    inputStyle: {
        marginTop: scale(10),
        borderWidth: scale(0.5),
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
export default OTPForgetPassword;
