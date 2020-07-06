import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Dimensions, StyleSheet, Keyboard } from 'react-native';
import Header from '../../components/common/Header';
import { scale, scaleModerate, scaleVertical } from '../../constant/Scale';
import * as COLOR from '../../constant/Colors';
import { formatMoney } from '../../constant/CommonFormat';
import { TRANS_PASSWORD_SCREEN, COMMIT_TRANSFER, LOGIN, ON_TRANSFER_SUCCESS, ON_BILL_CREATE_SUCCESS, EPIN_SUCCESS, } from '../../navigators/RouteName';
import AsyncStorage from '@react-native-community/async-storage';
import { getCurrentTime, md5Signature } from '../../constant/Secure'
import { transfer, createBill, createEpin, createKplus } from '../../fetchAPIs/AuthApi';
import LoadingDialog from '../../components/common/LoadingDialog';
import MessageDialog from '../../components/common/MessageDialog';
import Toast from 'react-native-simple-toast';
import { Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
class CommitTransferTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            responseError: null,
            isTokenExpired: false,
            transPassword: ''
        };
    }

    async _onPressCommit() {
        this.setState({ isLoading: true });
        let token_user = await AsyncStorage.getItem('access_token');
        let data = this.props.route.params.dataBillCreate;
        let mobile = data.phoneNumber
        let service = data.service
        let telco = data.network
        let amount = data.amount
        let time = getCurrentTime()
        let dataSign = mobile + '*' + service + '*' + telco + '*' + amount + '*' + time + '*' + this.state.transPassword
        let signature = md5Signature(dataSign)
        const response = await createBill(mobile, service, telco, amount, time, signature, token_user)
        this.setState({ isLoading: false });
        if (!response) {
            this.setState({ responseError: { message: getString('UNKNOWN_ERROR') } });
        } else if (response.errorCode !== 200) {
            if (response.message === 'InvalidToken') {
                this.setState({
                    isTokenExpired: true,
                })
            } else {
                this.setState({
                    responseError: response
                })
            }
        } else {
            this.props.navigation.navigate(ON_BILL_CREATE_SUCCESS, {
                dataCreateBillSuccess: {
                    mobile: mobile,
                    service: service,
                    telco: telco,
                    amount: amount
                }
            });
        }
    }

    async _onPressEpinCommit() {
        this.setState({ isLoading: true });
        let token_user = await AsyncStorage.getItem('access_token');
        let data = this.props.route.params.dataBillCreate;
        let telco = data.network
        let amount = data.amount
        let number = data.number
        let time = getCurrentTime()
        let dataSign = telco + '*' + amount + '*' + number + '*' + time + '*' + this.state.transPassword
        console.log(dataSign)
        let signature = md5Signature(dataSign)
        // const response = await createBill(mobile, service, telco, amount, time, signature, token_user)
        const response = await createEpin(telco, amount, number, signature, token_user, time)
        console.log(response)
        this.setState({ isLoading: false });
        if (!response) {
            this.setState({ responseError: { message: getString('UNKNOWN_ERROR') } });
        } else if (response.errorCode !== 200) {
            if (response.message === 'InvalidToken') {
                this.setState({
                    isTokenExpired: true,
                })
            } else {
                this.setState({
                    responseError: response
                })
            }
        } else {
            this.props.navigation.navigate(EPIN_SUCCESS, {
                data: {
                    dataEpin: response.data,
                    network: telco,
                    amount: amount
                }
            });
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
    async onPressKPlus() {
        this.setState({ isLoading: true });
        let token_user = await AsyncStorage.getItem('access_token');
        let data = this.props.route.params.dataBillCreate;
        let username = data.phoneNumber;
        let month_cnt = data.month;
        let addition = data.number;
        let time = getCurrentTime();
        let dataSign = username + '*' + month_cnt + '*' + addition + '*' + time + '*' + this.state.transPassword
        let signature = md5Signature(dataSign);
        console.log(dataSign)
        const response = await createKplus(username, month_cnt, addition, signature, token_user, time)
        console.log(response)
        this.setState({ isLoading: false });
        if (!response) {
            this.setState({ responseError: { message: getString('UNKNOWN_ERROR') } });
        } else if (response.errorCode !== 200) {
            if (response.message === 'InvalidToken') {
                this.setState({
                    isTokenExpired: true,
                })
            } else {
                this.setState({
                    responseError: response
                })
            }
        } else {
            this.props.navigation.navigate(ON_BILL_CREATE_SUCCESS, {
                dataCreateBillSuccess: {
                    type:'KPLUS',
                    username: username,
                    month_cnt: month_cnt,
                    addition: addition,
                }
            });
        }
    }

    render() {
        if (!this.state.isTokenExpired) {
            let data = this.props.route.params.dataBillCreate;
            let type = data.service;
            let renderServiceType = 'Gia hạn K+';
            if (type === 'TKC') {
                renderServiceType = 'Bắn TK trả trước'
            } else if (type === 'TT') {
                renderServiceType = 'Nạp thẻ trả trước'
            } else if (type === 'TS') {
                renderServiceType = 'Nạp thẻ trả sau'
            } else if (type === 'FTTH') {
                renderServiceType = 'Internet'
            }
            else if (type === 'EPIN') {
                renderServiceType = 'Mua mã thẻ'
            }
            let network = data.network
            let renderNetwork = ''
            if (network === 'VTT') {
                renderNetwork = 'Viettel'
            } else if (network === 'VINA') {
                renderNetwork = 'Vinaphone'
            } else if (network === 'VMS') {
                renderNetwork = 'Mobiphone'
            }
            return (
                <>
                    <Header navigation={this.props.navigation} back={true} title={'Xác thực giao dịch'} />
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => Keyboard.dismiss()}
                        style={{ width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'center', paddingTop: scaleVertical(20) }}>
                        <View style={{ paddingLeft: scale(10), width: '90%', height: '55%', backgroundColor: 'white', borderRadius: scale(10) }}>
                            {
                                type !== 'EPIN' ?
                                    <>
                                        <Text style={styles.textStyle}>Giao dịch tới tài khoản:</Text>
                                        <Text style={styles.dataStyle}>{data.phoneNumber}</Text>
                                    </> : null
                            }

                            <Text style={styles.textStyle}>Dịch vụ:</Text>
                            <Text style={styles.dataStyle}>{renderServiceType} {renderNetwork}</Text>


                            <Text style={styles.textStyle}>Số tiền:</Text>
                            <Text style={styles.dataStyle}>{formatMoney(data.amount)}</Text>
                            {
                                type === 'EPIN' ?
                                    <>
                                        <Text style={styles.textStyle}>Số lượng:</Text>
                                        <Text style={styles.dataStyle}>{data.number}</Text>
                                    </>
                                    : null
                            }
                            <Text style={styles.textStyle}>Nhập mật khẩu giao dịch:</Text>
                            <TextInput
                                onChangeText={(transPassword) => this.setState({ transPassword })}
                                maxLength={4}
                                secureTextEntry={true}
                                keyboardType="number-pad"
                                placeholder={'Mật khẩu giao dịch'}
                                style={styles.inputStyle}></TextInput>
                        </View>


                        {
                            data.service === 'KPLUS' ? <View style={{ flexDirection: 'row', width: '100%', height: '10%', marginTop: scale(10), justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity
                                    disabled={(this.state.transPassword) ? false : true}
                                    onPress={() => this.onPressKPlus()}
                                    style={{ borderRadius: scaleModerate(30), }}>
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
                                        <Text style={{ fontSize: scale(15), color: (this.state.transPassword) ? 'white' : '#C0C0C0' }}>Xác nhận</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View> : <View style={{ flexDirection: 'row', width: '100%', height: '10%', marginTop: scale(10), justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        disabled={(this.state.transPassword) ? false : true}
                                        onPress={() => (type === 'EPIN' ? this._onPressEpinCommit() : this._onPressCommit())}
                                        style={{ borderRadius: scaleModerate(30), }}>
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
                                            <Text style={{ fontSize: scale(15), color: (this.state.transPassword) ? 'white' : '#C0C0C0' }}>Xác nhận</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                        }
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate(TRANS_PASSWORD_SCREEN)}>
                            <Text style={{ fontSize: scale(15), marginTop: scaleVertical(20), textDecorationLine: 'underline', fontWeight: 'bold', color: COLOR.PRIMARY_COLOR }}>Quản lý mật khẩu giao dịch</Text>
                        </TouchableOpacity>

                    </TouchableOpacity>
                    {
                        this.state.isLoading && <LoadingDialog />
                    }
                    {

                        this.state.responseError !== null ? <MessageDialog
                            message={(this.state.responseError.descripiton) ? this.state.responseError.descripiton : this.state.responseError.message}
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
    textStyle: {
        fontSize: scale(15),
        fontWeight: 'bold',
        color: COLOR.PRIMARY_COLOR,
        marginTop: scale(10)
    },
    dataStyle: {
        marginTop: scale(5),
        fontSize: scale(14),
        fontStyle: 'italic',
        color: 'gray'
    }, inputStyle: {
        marginTop: scale(5),
        borderBottomWidth: scale(0.5),
        borderColor: 'gray',
        borderRadius: scaleModerate(3),
        width: '95%',
        paddingVertical: scaleVertical(10),
        paddingHorizontal: scaleModerate(0),
        justifyContent: 'center',
        fontSize: scaleModerate(15),
        textAlign: 'left',
    },

})
export default CommitTransferTransaction;
