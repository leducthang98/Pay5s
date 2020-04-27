import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { BOTTOM_TAB } from '../../navigators/RouteName';
import { connect } from 'react-redux';
import { getAccountInfo } from '../../actions/ActionHomeScreen';
import Header from '../../components/common/Header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { scale, scaleModerate } from '../../constant/Scale';
import { PRIMARY_COLOR } from '../../constant/Colors';
import { formatMoney } from '../../constant/CommonFormat'
import { getBill } from '../../actions/ActionBillScreen';
class OnBillCreateSuccess extends React.Component {
    async backHome() {
        let token_user = await AsyncStorage.getItem('access_token');
        this.props.getAccountInfo(token_user);
        this.props.getBill(token_user);
        this.props.navigation.navigate(BOTTOM_TAB);
    }
    render() {
        let data = this.props.route.params.dataCreateBillSuccess;
        return (
            <>
                <Header title={'Kết quả giao dịch'} back={false} />
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={{ width: '100%', height: '30%', justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name={'check-circle'} size={scaleModerate(60)} color={PRIMARY_COLOR} />
                    </View>
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingLeft: scale(20), paddingRight: scale(10) }}>
                        <Text style={{ fontSize: scale(14) }}>Quý khách đã giao dịch thành công {<Text style={{ fontWeight: 'bold', fontSize: scale(14), color: PRIMARY_COLOR }}> {formatMoney(data.amount)} VNĐ</Text>} cho số điện thoại {<Text style={{ fontWeight: 'bold', fontSize: scale(14), color: PRIMARY_COLOR }}>0{data.mobile}</Text>}.</Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            width: containerW * 0.85,
                            height: scale(45),
                            backgroundColor: PRIMARY_COLOR,
                            borderRadius: scaleModerate(6),
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: scale(120)
                        }}
                        onPress={() => this.backHome()}
                    >
                        <View >
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: scaleModerate(14) }}>Quay về trang chủ</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </>
        );
    }

}
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
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
export default connect(mapStateToProps, mapDispatchToProps)(OnBillCreateSuccess);
