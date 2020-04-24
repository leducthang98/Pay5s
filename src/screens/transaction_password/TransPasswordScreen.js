import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    ScrollView,
    Dimensions,
    Image,
    StatusBar,
    FlatList,
    ActivityIndicator,
    Platform
} from 'react-native';
import Header from '../../components/common/Header'
import { scale, scaleModerate, scaleVertical } from '../../constant/Scale';
import { FACEBOOK, PRIMARY_COLOR } from '../../constant/Colors'
import { connect } from 'react-redux';
import { refreshStore } from '../../actions/ActionRefresh';
import Loading from '../../components/common/Loading';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import { CommonActions } from '@react-navigation/native';
import { LOGIN, CREATE_TRANS_PASSWORD } from '../../navigators/RouteName';
class TransPasswordScreen extends React.Component {
    constructor(props) {
        super(props);

    };

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
    createTransPassword() {
        this.props.navigation.navigate(CREATE_TRANS_PASSWORD)
    }
    forgetTransPassword() {
        Toast.show("Quên mật khẩu.")
    }
    renderButton(set_trans_key) {
        if (set_trans_key) {
            return (
                <View style={{ alignItems: 'center', marginTop: scale(70) }}>
                    <TouchableOpacity style={styles.buttons}
                        onPress={() => this.forgetTransPassword()}
                    >
                        <View>
                            <Text style={{ color: 'white', fontSize: scale(14), fontWeight: 'bold' }} >Quên mật khẩu giao dịch</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
        else {
            return (
                <View style={{ alignItems: 'center', marginTop: scale(70) }}>
                    <TouchableOpacity style={styles.buttons}
                        onPress={() => this.createTransPassword()}
                    >
                        <View>
                            <Text style={{ color: 'white', fontSize: scale(14), fontWeight: 'bold' }}>Tạo mật khẩu giao dịch</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttons}
                        onPress={() => this.forgetTransPassword()}
                    >
                        <View>
                            <Text style={{ color: 'white', fontSize: scale(14), fontWeight: 'bold' }} >Quên mật khẩu giao dịch</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
    }
    render() {
        if (this.props.accountInfo) {
            const accountResponse = this.props.accountInfo;
            if (accountResponse.errorCode === 200) {
                return (
                    <View>
                        <Header title={'Mật khẩu giao dịch'} back={true} navigation={this.props.navigation} />
                        <View style={{ paddingTop: scale(10), paddingLeft: scale(10) }}>
                            <Text style={{ fontWeight: 'bold', color: FACEBOOK, fontSize: scaleModerate(15) }}>HƯỚNG DẪN:</Text>
                            <Text style={{ fontSize: scale(14), color: '#696969' }}>- Mật khẩu giao dịch được dùng trong khi giao dịch(vd: thanh toán hóa đơn, chuyển khoản,...).</Text>
                            <Text style={{ fontSize: scale(14), color: '#696969' }}>- Mật khẩu giao dịch gồm 4 chữ số.</Text>
                            <Text style={{ fontSize: scale(14), color: '#696969' }}>- Vì an toàn cá nhân, tuyệt đối không cho người khác biết mật khẩu giao dịch của bạn.</Text>
                            {this.renderButton(accountResponse.data.set_trans_key)}
                        </View>
                    </View>
                );
            }
            else if (accountResponse.errorCode === 500) {
                this.tokenInvalidFunction();
                return null;
            }
        }
        else {
            return (
                <Loading></Loading>
            );
        }
    }
}
const styles = StyleSheet.create({
    buttons: {
        backgroundColor: PRIMARY_COLOR,
        width: '80%',
        height: scale(40),
        marginTop: scaleVertical(15),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(3),


    }
})
const mapStateToProps = (store) => {
    return {
        accountInfo: store.homeReducer.accountInfo,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        refreshStore: () => {
            dispatch(refreshStore())
        },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TransPasswordScreen);
