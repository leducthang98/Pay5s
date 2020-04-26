import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Dimensions, StyleSheet } from 'react-native';
import Header from '../../components/common/Header';
import { scale, scaleModerate, scaleVertical } from '../../constant/Scale';
import * as COLOR from '../../constant/Colors';
import { formatMoney } from '../../constant/CommonFormat';
import { TRANS_PASSWORD_SCREEN, COMMIT_TRANSFER, LOGIN, ON_TRANSFER_SUCCESS } from '../../navigators/RouteName';
import AsyncStorage from '@react-native-community/async-storage';
import { getCurrentTime, md5Signature } from '../../constant/Secure'
import { transfer } from '../../fetchAPIs/AuthApi';
import LoadingDialog from '../../components/common/LoadingDialog';
import MessageDialog from '../../components/common/MessageDialog';
import Toast from 'react-native-simple-toast';
import { CommonActions } from '@react-navigation/native';
class CommitTransferTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            responseError: null,
            isTokenExpired: false,
        };
    }
    async _executeTransfer() {
        this.setState({ isLoading: true });
        let data = this.props.route.params.dataTransfer;
        let targetFull = data.mobile;
        let transPassword = data.transPassword
        let token_user = await AsyncStorage.getItem('access_token');
        let target = targetFull.substring(1);
        let amount = data.amount;
        let time = getCurrentTime();
        let dataSign = target + ';' + amount + ';' + time + ';' + transPassword;
        let signature = md5Signature(dataSign);
        const response = await transfer(target, amount, time, signature, token_user);
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
           this.props.navigation.navigate(ON_TRANSFER_SUCCESS,{
               dataTransferSuccess:{
                   mobile:targetFull,
                   amount:amount
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
    render() {
        if (!this.state.isTokenExpired) {
            const data = this.props.route.params.dataTransfer
            return (
                <>
                    <Header navigation={this.props.navigation} back={true} title={'Xác thực giao dịch'} />
                    <View style={{ width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'center', paddingTop: scaleVertical(20) }}>
                        <View style={{ paddingLeft: scale(10), width: '90%', height: '60%', backgroundColor: 'white', borderRadius: scale(10) }}>
                            <Text style={styles.textStyle}>Beneficiary phone number:</Text>
                            <Text style={styles.dataStyle}> {data.mobile}</Text>
                            <Text style={styles.textStyle}>Amount:</Text>
                            <Text style={styles.dataStyle}> {formatMoney(data.amount)} VNĐ</Text>
                            <Text style={styles.textStyle}>Transaction fee:</Text>
                            <Text style={styles.dataStyle}> 0 VNĐ</Text>
                            <Text style={styles.textStyle}>Operator:</Text>
                            <Text style={styles.dataStyle}>Pay5s Operators</Text>

                        </View>
                        <View style={{ flexDirection: 'row', width: '100%', height: '10%', marginTop: scale(10), justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.pop()}
                                style={{ height: '70%', width: '43%', backgroundColor: '#C0C0C0', borderRadius: scale(20), justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: scale(15), color: 'white' }}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this._executeTransfer()}
                                style={{ height: '70%', width: '43%', backgroundColor: COLOR.PRIMARY_COLOR, marginLeft: scale(10), borderRadius: scale(20), justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: scale(15), color: 'white' }}>Xác nhận</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
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
        }else{
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
    }

})
export default CommitTransferTransaction;
