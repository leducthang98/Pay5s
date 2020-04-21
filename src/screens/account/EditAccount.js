import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Header from '../../components/common/Header';
import { scaleVertical, scaleModerate, scale } from '../../constant/Scale';
import { connect } from 'react-redux';
import Loading from '../../components/common/Loading';
import { PRIMARY_COLOR } from '../../constant/Colors';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import { updateAccount } from '../../fetchAPIs/AuthApi'
import { getAccountInfo } from '../../actions/ActionHomeScreen';
import LoadingDialog from '../../components/common/LoadingDialog';
import MessageDialog from '../../components/common/MessageDialog';
class EditAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            dob: '',
            gender: '',
            email: '',
            address: '',
            isLoading: false,
            responseError: null
        };
    }
    validateGender() {
        let newGender = this.state.gender
        if (newGender == 'Nam') {
            return 'M';
        } else if (newGender == 'Nữ') {
            return 'F';
        } else if (newGender == '') {
            return 'O';
        }
        else {
            return this.state.gender
        }
    }
    async editAccount(oldName, oldDob, oldGender, oldEmail, oldAddress) {
        if (this.state.fullname == '' && this.state.dob == '' && this.state.gender == '' && this.state.email == '' && this.state.address == '') {
            Toast.show('Không có thông tin thay đổi.');
        } else {
            let genderValidated = this.validateGender();
            this.setState({ isLoading: true });
            const token_user = await AsyncStorage.getItem('access_token')
            const response = await updateAccount(token_user, (this.state.fullname == '') ? oldName : this.state.fullname, (this.state.dob == '') ? oldDob : this.state.dob, (genderValidated == 'O') ? oldGender : genderValidated, (this.state.email == '') ? oldEmail : this.state.email, (this.state.address == '') ? oldAddress : this.state.address);
            console.log('response in screen = ', response);
            this.setState({ isLoading: false });
            if (!response) {
                this.setState({ responseError: { message: getString('UNKNOWN_ERROR') } });
            } else if (response.errorCode !== 200) {
                this.setState({ responseError: response });
            } else {
                console.log(token_user)
                this._updateSuccess(response);
            }

        }
    }
    async _updateSuccess() {
        const token_user = await AsyncStorage.getItem('access_token');
        this.props.getAccountInfo(token_user);
        Toast.show('Thay đổi thông tin thành công.');
        this.props.navigation.pop();
    }
    render() {
        if (this.props.accountInfo) {
            let sex = 'null';
            if (this.props.accountInfo.gender) {
                let gender = this.props.accountInfo.gender
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
                    <Header navigation={this.props.navigation} back={true} title={'Chỉnh sửa thông tin'} />
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', height: scaleVertical(40), marginTop: scaleVertical(4), backgroundColor: 'white' }}>
                            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'flex-start' }}>
                                <Text style={{ color: 'gray', paddingLeft: scaleModerate(15), fontSize: scaleModerate(12) }}>Họ {"&"} tên</Text>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <TextInput
                                    placeholder={(this.props.accountInfo.fullname) ? this.props.accountInfo.fullname : 'Chưa có'}
                                    placeholderTextColor={'black'}
                                    onChangeText={(fullname) => this.setState({ fullname })}
                                    style={{ fontSize: scaleModerate(12), paddingRight: scaleModerate(15), paddingVertical: scaleVertical(0) }}></TextInput>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', height: scaleVertical(40), marginTop: scaleVertical(1) }}>
                            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'flex-start' }}>
                                <Text style={{ color: 'gray', paddingLeft: scaleModerate(15), fontSize: scaleModerate(12) }}>Số điện thoại</Text>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <Text style={{ fontSize: scaleModerate(12), paddingRight: scaleModerate(15) }}>{(this.props.accountInfo.mobile) ? 0 + this.props.accountInfo.mobile : 'Chưa có'}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', height: scaleVertical(40), marginTop: scaleVertical(8), backgroundColor: 'white' }}>
                            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'flex-start' }}>
                                <Text style={{ color: 'gray', paddingLeft: scaleModerate(15), fontSize: scaleModerate(12) }}>Ngày sinh</Text>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <TextInput
                                    placeholder={(this.props.accountInfo.dob) ? this.props.accountInfo.dob : '0000-00-00'}
                                    placeholderTextColor={'black'}
                                    onChangeText={(dob) => this.setState({ dob })}
                                    style={{ fontSize: scaleModerate(12), paddingRight: scaleModerate(15), paddingVertical: scaleVertical(0) }}></TextInput>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', height: scaleVertical(40), marginTop: scaleVertical(1), backgroundColor: 'white' }}>
                            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'flex-start' }}>
                                <Text style={{ color: 'gray', paddingLeft: scaleModerate(15), fontSize: scaleModerate(12) }}>Giới tính</Text>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <TextInput
                                    placeholder={(this.props.accountInfo.gender) ? sex : 'Chưa có'}
                                    placeholderTextColor={'black'}
                                    onChangeText={(gender) => this.setState({ gender })}
                                    style={{ fontSize: scaleModerate(12), paddingRight: scaleModerate(15), paddingVertical: scaleVertical(0) }}></TextInput>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', height: scaleVertical(40), marginTop: scaleVertical(1), backgroundColor: 'white' }}>
                            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'flex-start' }}>
                                <Text style={{ color: 'gray', paddingLeft: scaleModerate(15), fontSize: scaleModerate(12) }}>Email</Text>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <TextInput
                                    placeholder={(this.props.accountInfo.email) ? this.props.accountInfo.email : 'Chưa có'}
                                    placeholderTextColor={'black'}
                                    onChangeText={(email) => this.setState({ email })}
                                    style={{ fontSize: scaleModerate(12), paddingRight: scaleModerate(15), paddingVertical: scaleVertical(0) }}></TextInput>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', height: scaleVertical(40), marginTop: scaleVertical(10), backgroundColor: 'white' }}>
                            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'flex-start' }}>
                                <Text style={{ color: 'gray', paddingLeft: scaleModerate(15), fontSize: scaleModerate(12) }}>Địa chỉ</Text>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <TextInput
                                    placeholder={(this.props.accountInfo.address) ? this.props.accountInfo.address : 'Chưa có'}
                                    placeholderTextColor='black'
                                    onChangeText={(address) => this.setState({ address })}
                                    style={{ fontSize: scaleModerate(12), paddingRight: scaleModerate(15), paddingVertical: scaleVertical(0) }}></TextInput>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: scale(25) }}>
                        <TouchableOpacity style={{ width: '90%', height: scaleVertical(42), backgroundColor: PRIMARY_COLOR, borderRadius: scale(6), justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => this.editAccount(this.props.accountInfo.fullname, this.props.accountInfo.dob, this.props.accountInfo.gender, this.props.accountInfo.email, this.props.accountInfo.address)}
                        >
                            <Text style={{ fontSize: scale(13), color: 'white', fontWeight: 'bold' }}>LƯU THAY ĐỔI</Text>
                        </TouchableOpacity>
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
        getAccountInfo: (token_user) => {
            dispatch(getAccountInfo(token_user))
        },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditAccount);