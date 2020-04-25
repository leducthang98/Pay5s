import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Dimensions, StyleSheet } from 'react-native';
import Header from '../../components/common/Header';
import { scale, scaleModerate, scaleVertical } from '../../constant/Scale';
import * as COLOR from '../../constant/Colors';
import { formatMoney } from '../../constant/CommonFormat';
import { TRANS_PASSWORD_SCREEN, COMMIT_TRANSFER } from '../../navigators/RouteName';
import AsyncStorage from '@react-native-community/async-storage';
import { getCurrentTime, md5Signature } from '../../constant/Secure'
class CommitTransferTransaction extends React.Component {
    async _executeTransfer() {
        let data = this.props.route.params.dataTransfer;
        let targetFull = data.mobile;
        let transPassword = data.transPassword
        let token_user = await AsyncStorage.getItem('access_token'); // this
        let target = targetFull.substring(1);
        let amount = data.amount;  // this
        let time = getCurrentTime(); // this
        let dataSign = target + ';' + amount + ';' + transPassword
        let signature = md5Signature(dataSign); // this
        console.log('token:' + token_user);
        console.log('mobile:' + target);
        console.log('amount:' + amount);
        console.log('time:' + time);
        console.log('signature:' + signature);
    }
    render() {
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
                        <Text style={styles.dataStyle}>SSL/TLS secure transaction</Text>

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

            </>
        );
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
