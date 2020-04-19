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
import {PRIMARY_COLOR} from '../../constant/Colors'
class EditAccount extends React.Component {
    render() {
        if (this.props.accountInfo) {
            let sex = 'null';
            if (this.props.accountInfo.gender) {
                let gender = this.props.accountInfo.gender
                if (gender == 'M') {
                    sex = 'Nam'
                } else {
                    sex = 'Nữ'
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
                                <TextInput style={{ fontSize: scaleModerate(12), paddingRight: scaleModerate(15), paddingVertical: scaleVertical(0) }}>{(this.props.accountInfo.fullname) ? this.props.accountInfo.fullname : 'Chưa có'}</TextInput>
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
                                <TextInput style={{ fontSize: scaleModerate(12), paddingRight: scaleModerate(15), paddingVertical: scaleVertical(0) }}>{(this.props.accountInfo.dob) ? this.props.accountInfo.dob : '0000-00-00'}</TextInput>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', height: scaleVertical(40), marginTop: scaleVertical(1), backgroundColor: 'white' }}>
                            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'flex-start' }}>
                                <Text style={{ color: 'gray', paddingLeft: scaleModerate(15), fontSize: scaleModerate(12) }}>Giới tính</Text>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <TextInput style={{ fontSize: scaleModerate(12), paddingRight: scaleModerate(15), paddingVertical: scaleVertical(0) }}>{(this.props.accountInfo.gender) ? sex : 'Chưa có'}</TextInput>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', height: scaleVertical(40), marginTop: scaleVertical(1), backgroundColor: 'white' }}>
                            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'flex-start' }}>
                                <Text style={{ color: 'gray', paddingLeft: scaleModerate(15), fontSize: scaleModerate(12) }}>Email</Text>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <TextInput style={{ fontSize: scaleModerate(12), paddingRight: scaleModerate(15), paddingVertical: scaleVertical(0) }}>{(this.props.accountInfo.email) ? this.props.accountInfo.email : 'Chưa có'}</TextInput>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', height: scaleVertical(40), marginTop: scaleVertical(10), backgroundColor: 'white' }}>
                            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'flex-start' }}>
                                <Text style={{ color: 'gray', paddingLeft: scaleModerate(15), fontSize: scaleModerate(12) }}>Địa chỉ</Text>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <TextInput style={{ fontSize: scaleModerate(12), paddingRight: scaleModerate(15), paddingVertical: scaleVertical(0) }}>{(this.props.accountInfo.address) ? this.props.accountInfo.address : 'Chưa có'}</TextInput>
                            </View>
                        </View>
                    </View>
                    <View style={{flex:1,justifyContent:'flex-end',alignItems:'center',paddingBottom:scale(5)}}>
                        <TouchableOpacity style={{width:'90%',height:scaleVertical(42),backgroundColor:PRIMARY_COLOR,borderRadius:scale(6),justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:scale(13),color:'white',fontWeight:'bold'}}>LƯU THAY ĐỔI</Text>
                        </TouchableOpacity>
                    </View>
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


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditAccount);