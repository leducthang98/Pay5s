import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { statusBarHeight } from '../configs/Layout';
import { scale } from '../configs/Scale';
import Icon from 'react-native-vector-icons/FontAwesome5';
class CheckWallet extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{ justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold', fontSize: scale(16) }}>Số dư Ví Thẻ</Text>
                </View>

            </View>
        );
    }
}
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        width: containerW,
        height: containerH,
        alignItems: 'center'
    },
    header: {
        width: containerW,
        height: containerH / 13,
        backgroundColor: '#ee2797',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: statusBarHeight / 1.5,
    },
  
})
export default CheckWallet;