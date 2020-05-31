import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { BOTTOM_TAB } from '../../navigators/RouteName';
import { connect } from 'react-redux';
import { getAccountInfo } from '../../actions/ActionHomeScreen';
import Header from '../../components/common/Header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { scale, scaleModerate, scaleVertical } from '../../constant/Scale';
import { PRIMARY_COLOR } from '../../constant/Colors';
import { formatMoney } from '../../constant/CommonFormat'
import { getBill } from '../../actions/ActionBillScreen';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import * as COLOR from '../../constant/Colors';
const { width } = Layout.window;
import * as Layout from '../../constant/Layout';
class EpinCreateSuccess extends React.Component {
    async backHome() {
        let token_user = await AsyncStorage.getItem('access_token');
        this.props.getAccountInfo(token_user);
        this.props.getBill(token_user);
        this.props.navigation.navigate(BOTTOM_TAB);
    }
    _renderEpin(network, amount, code, serial) {
        return (
            <View style={{
                width: '95%', height: scale(70), marginTop: scale(5), backgroundColor: 'white',
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.20,
                shadowRadius: 1.41,

                elevation: 10,
            }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: scale(10) }}>
                    <Text style={{ fontSize: scale(14), fontWeight: 'bold', color: COLOR.PURPLE_FONTCOLOR }}>Code: </Text>
                    <Text style={{ fontSize: scale(14), fontWeight: 'bold', color: COLOR.GRAY_FONTCOLOR }}>{code}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: scale(10) }}>
                    <Text style={{ fontSize: scale(14), fontWeight: 'bold', color: COLOR.PURPLE_FONTCOLOR }}>Serial: </Text>
                    <Text style={{ fontSize: scale(14), fontWeight: 'bold', color: COLOR.GRAY_FONTCOLOR }}>{serial}</Text>
                </View>
            </View>
        )
    }
    render() {
        let data = this.props.route.params.data;
        let network = 'null'
        if (data.network === 'VTT') {
            network = 'Viettel'
        } else if (data.network === 'VINA') {
            network = 'Vinaphone'
        } else {
            network = 'Mobifone'
        }
        let headerString = 'Mã thẻ ' + network + ' - ' + formatMoney(data.amount) + 'VNĐ'
        return (
            <>
                <Header title={'Kết quả giao dịch'} back={false} />
                <Text
                    style={{ fontSize: scale(15), paddingLeft: scale(10), paddingTop: scale(5), paddingBottom: scale(5), fontWeight: 'bold', color: COLOR.PINK_FONTCOLOR }}
                >Thông tin mã thẻ sẽ được lưu lại ở lịch sử giao dịch.</Text>
                <View style={{ flexDirection: 'row' }}>

                    <Text style={{ fontSize: scale(15), paddingLeft: scale(10), paddingTop: scale(5), paddingBottom: scale(5), fontWeight: 'bold', color: COLOR.GRAY_FONTCOLOR }}>
                        Loại thẻ:
                <Text
                            style={{ fontSize: scale(15), fontWeight: 'bold', color: COLOR.PURPLE_FONTCOLOR }}
                        >

                            {' ' + network}
                        </Text>
                    </Text>
                    <Text style={{ fontSize: scale(15), paddingLeft: scale(10), paddingTop: scale(5), paddingBottom: scale(5), fontWeight: 'bold', color: COLOR.GRAY_FONTCOLOR }}>
                        Giá trị:
                <Text
                            style={{ fontSize: scale(15), fontWeight: 'bold', color: COLOR.PURPLE_FONTCOLOR }}
                        >

                            {' ' + formatMoney(data.amount) + 'VNĐ'}
                        </Text>
                    </Text>
                    <Text style={{ fontSize: scale(15), paddingLeft: scale(10), paddingTop: scale(5), paddingBottom: scale(5), fontWeight: 'bold', color: COLOR.GRAY_FONTCOLOR }}>
                        Số lượng:
                <Text
                            style={{ fontSize: scale(15), fontWeight: 'bold', color: COLOR.PURPLE_FONTCOLOR }}
                        >

                            {' ' + data.dataEpin.length}
                        </Text>
                    </Text>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ alignItems: 'center', paddingBottom: scale(10) }}
                >
                    {
                        data.dataEpin.map((item, index) => {
                            let code = item.code
                            let serial = item.serial
                            let network = data.network
                            let amount = data.amount
                            return this._renderEpin(network, amount, code, serial);
                        })
                    }
                </ScrollView>
                <View style={{ width: '100%', height: scale(90), justifyContent: 'center', alignItems: 'center', paddingBottom: scale(10) }}>
                    <TouchableOpacity
                        onPress={() => this.backHome()}
                        style={{ borderRadius: scaleModerate(30), backgroundColor: "red" }}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }}
                            colors={['#ff547c', '#c944f7']}
                            style={{
                                width: containerW * 0.7,
                                height: scale(40),
                                borderRadius: scaleModerate(30),
                                alignItems: 'center',
                                justifyContent: 'center',

                            }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: scaleModerate(14) }}>Quay về trang chủ</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </>
        );
    }

}
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUND_COLOR,
    },
    center: {
        width,
        alignItems: 'center',
        backgroundColor: COLOR.BACKGROUND_COLOR,
        paddingBottom: scaleVertical(10),
    },

});
const mapStateToProps = (store) => {
    return {

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAccountInfo: (token_user) => {
            dispatch(getAccountInfo(token_user))
        },
        getBill: (token_user) => {
            dispatch(getBill(token_user))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EpinCreateSuccess);
