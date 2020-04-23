import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Dimensions, StyleSheet } from 'react-native';
import Header from '../../components/common/Header';
import { scaleVertical, scaleModerate, scale } from '../../constant/Scale';
import {PRIMARY_COLOR} from '../../constant/Colors'
class ForgetPassword extends React.Component {
    render() {
        return (
            <>
                <Header navigation={this.props.navigation} back={true} title={'Quên mật khẩu'} />
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 3.5, alignItems: "center", justifyContent: 'flex-start' }}>
                    <TextInput
                        style={styles.inputStyle}
                        keyboardType="number-pad"
                        placeholder={'Nhập số điện thoại'}
                    />
                    <TextInput
                        style={styles.inputStyle}
                        secureTextEntry={true}
                        placeholder={'Nhập mật khẩu mới'}
                    />
                    <TextInput
                        style={styles.inputStyle}
                        secureTextEntry={true}
                        placeholder={'Xác nhận mật khẩu'}
                    />
                </View>
                <View style={{ flex: 5, width: '100%', alignItems: 'center' }}>
                        <TouchableOpacity
                          
                        >
                            <View style={{
                                width: containerW * 0.4,
                                height: scale(45),
                                backgroundColor: PRIMARY_COLOR,
                                borderRadius: scaleModerate(10),
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Text style={{ color: 'white', fontWeight: 'bold',fontSize:scaleModerate(14) }}>Lấy mã OTP</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
            </>
        );
    }
}
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
const styles = StyleSheet.create({
    inputStyle: {
        marginTop: scaleVertical(20),
        borderColor: 'black',
        width: '80%',
        paddingVertical: scaleVertical(10),
        paddingHorizontal: scaleModerate(0),
        justifyContent: 'center',
        fontSize: scaleModerate(15),
        borderRadius: scale(10),
        borderLeftWidth: scale(0.7),
        borderTopWidth: scale(0.7),
        borderRightWidth: scale(0.7),
        borderBottomWidth: scale(0.7),
        borderColor: 'gray',
        paddingLeft: scale(10)
    }

})
export default ForgetPassword;
