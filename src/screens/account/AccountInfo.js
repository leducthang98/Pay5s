import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Alert
} from 'react-native';
import Header from '../../components/common/Header';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import * as COLOR from '../../constant/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { scaleVertical, scaleModerate, scale } from '../../constant/Scale';
import { logout } from '../../fetchAPIs/AuthApi';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import { LOGIN, BEGIN } from '../../navigators/RouteName';
import LoadingDialog from '../../components/common/LoadingDialog';
import MessageDialog from '../../components/common/MessageDialog';
import Loading from '../../components/common/Loading';
import { refreshStore } from '../../actions/ActionRefresh';
class AccountInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            responseError: null,
            isTokenExpired: false,
        };
    }
    async logout() {
        this.setState({ isLoading: true });
        const token_user = await AsyncStorage.getItem('access_token')
        const response = await logout(token_user);
        this.setState({ isLoading: false });
        if (!response) {
            this.setState({ responseError: { message: getString('UNKNOWN_ERROR') } });
        } else if (response.errorCode !== 200) {
            if (response.errorCode === 500) {
                this.setState({
                    ...this.state,
                    isTokenExpired: true,
                });
            }
        } else {
            console.log(token_user)
            this._logoutSuccess();
        }
    }

    async _logoutSuccess() {
        this.props.refreshStore();
        await AsyncStorage.clear();
        this.props.navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [{ name: BEGIN }],
            })
        );
    }
    logoutAlert = () =>
        Alert.alert(
            "Lưu ý",
            "Bạn sẽ không nhận được thông báo khuyến mãi cho đến khi đăng nhập lại.",
            [
                {
                    text: "Hủy",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Đăng xuất", onPress: () => this.logout() }
            ],
            { cancelable: false }
        );
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
    render() {
        if (this.props.accountInfo) {
            const accountResponse = this.props.accountInfo
            if (accountResponse.errorCode === 200 && this.state.isTokenExpired === false) {
                let sex = 'null';
                if (accountResponse.data.gender) {
                    let gender = accountResponse.data.gender
                    if (gender == 'M') {
                        sex = 'Nam'
                    } else if (gender == 'F') {
                        sex = 'Nữ'
                    } else {
                        sex = 'Chưa có'
                    }
                }
                return (
                    <>
                        <View style={{ flex: 1 }}>
                            <Header navigation={this.props.navigation} back={true} rightIcon={'pen'} title={'Tài khoản của tôi'} screenPopUpFromRightIcon={'EditAccount'} />
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', height: scaleVertical(40), marginTop: scaleVertical(4), backgroundColor: 'white' }}>
                                    <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'flex-start' }}>
                                        <Text style={{ color: 'gray', paddingLeft: scaleModerate(15), fontSize: scaleModerate(12) }}>Họ {"&"} tên</Text>
                                    </View>
                                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: scaleModerate(12), paddingRight: scaleModerate(15) }}>{(accountResponse.data.fullname) ? accountResponse.data.fullname : 'Chưa có'}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', height: scaleVertical(40), backgroundColor: 'white', marginTop: scaleVertical(1) }}>
                                    <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'flex-start' }}>
                                        <Text style={{ color: 'gray', paddingLeft: scaleModerate(15), fontSize: scaleModerate(12) }}>Số điện thoại</Text>
                                    </View>
                                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: scaleModerate(12), paddingRight: scaleModerate(15) }}>{(accountResponse.data.mobile) ? 0 + accountResponse.data.mobile : 'Chưa có'}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', height: scaleVertical(40), backgroundColor: 'white', marginTop: scaleVertical(10) }}>
                                    <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'flex-start' }}>
                                        <Text style={{ color: 'gray', paddingLeft: scaleModerate(15), fontSize: scaleModerate(12) }}>Ngày sinh</Text>
                                    </View>
                                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: scaleModerate(12), paddingRight: scaleModerate(15) }}>{(accountResponse.data.dob) ? accountResponse.data.dob : '00/00/0000'}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', height: scaleVertical(40), backgroundColor: 'white', marginTop: scaleVertical(1) }}>
                                    <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'flex-start' }}>
                                        <Text style={{ color: 'gray', paddingLeft: scaleModerate(15), fontSize: scaleModerate(12) }}>Giới tính</Text>
                                    </View>
                                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: scaleModerate(12), paddingRight: scaleModerate(15) }}>{(accountResponse.data.gender) ? sex : 'Chưa có'}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', height: scaleVertical(40), backgroundColor: 'white', marginTop: scaleVertical(1) }}>
                                    <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'flex-start' }}>
                                        <Text style={{ color: 'gray', paddingLeft: scaleModerate(15), fontSize: scaleModerate(12) }}>Email</Text>
                                    </View>
                                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: scaleModerate(12), paddingRight: scaleModerate(15) }}>{(accountResponse.data.email) ? accountResponse.data.email : 'Chưa có'}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', height: scaleVertical(40), backgroundColor: 'white', marginTop: scaleVertical(10) }}>
                                    <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'flex-start' }}>
                                        <Text style={{ color: 'gray', paddingLeft: scaleModerate(15), fontSize: scaleModerate(12) }}>Địa chỉ</Text>
                                    </View>
                                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: scaleModerate(12), paddingRight: scaleModerate(15) }}>{(accountResponse.data.address) ? accountResponse.data.address : 'Chưa có'}</Text>
                                    </View>
                                </View>

                                <TouchableOpacity style={{ marginTop: scaleVertical(30), width: '60%' }}
                                    onPress={() => this.logoutAlert()}
                                >
                                    <View style={{ backgroundColor: '#C4CACE', height: scaleVertical(45), justifyContent: 'center', alignItems: 'center', borderRadius: scale(6), flexDirection: 'row' }}>
                                        <View style={{ flex: 1, backgroundColor: 'red' }} />
                                        <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontSize: scale(13), fontWeight: '500' }}>ĐĂNG XUẤT</Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                            <Icon name={'sign-in-alt'} size={scaleModerate(19)} color='black' />
                                        </View>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View>
                        {
                            this.state.isLoading && <LoadingDialog />
                        }
                        {
                            this.state.responseError !== null ? <MessageDialog
                                message={"Có lỗi xảy ra"}
                                close={() => {
                                    this.setState({ responseError: null });
                                }}
                            /> : null
                        }
                    </>
                );
            }
            else if (accountResponse.errorCode === 500 || this.state.isTokenExpired === true) {
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
export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);
