import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    ScrollView,
    Image,
    StyleSheet,
    Dimensions
} from "react-native";
import { scale } from '../configs/Scale'
import { statusBarHeight } from '../configs/Layout';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AccountTabView from './AccountTabView';
import { BOTTOM_TAB } from "../navigators/RouteName";
const { width } = Dimensions.get("window");
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
export default class CheckWallet extends React.Component {
    backButton() {
        this.props.navigation.navigate(BOTTOM_TAB)
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity style={{paddingLeft:scale(10)}}
                        onPress={() => this.backButton()}
                    >
                        <Icon style={{ paddingTop: scale(3) }} name={'chevron-left'} size={scale(19)} color={"white"} />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: scale(16),paddingLeft:scale(116) }}>Số dư ví thẻ</Text>
                </View>
                <View style={styles.body}>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name={'coins'} size={scale(30)} color={"green"} />
                        <Text style={{ fontSize: scale(12), paddingTop: scale(3) }}>Nạp số dư</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name={'coins'} size={scale(30)} color={"green"} />
                        <Text style={{ fontSize: scale(12), paddingTop: scale(3) }}>Chuyển khoản</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 2, backgroundColor: 'white' }}>
                        <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Icon style={{ paddingLeft: scale(5) }} name={'coins'} size={scale(15)} color={"green"} />
                            <Text style={{ fontSize: scale(12), paddingLeft: scale(5) }}>Số dư</Text>
                        </View>
                        <View style={{ backgroundColor: 'white', flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                            <Text style={{ paddingBottom: scale(3), paddingRight: scale(5), fontWeight: 'bold', fontSize: scale(16), color: 'purple' }}>13.400đ</Text>
                        </View>
                    </View>
                </View>
                <AccountTabView />
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        width: containerW,
        height: containerH,
        alignItems: 'center'
    },
    header: {
        width: containerW,
        height: containerH / 11,
        backgroundColor: '#C71585',
        alignItems: 'center',
        paddingTop: statusBarHeight / 1.5,
        flexDirection: 'row'
    },
    header2: {
        width: containerW,
        height: containerH / 11,
        backgroundColor: '#C71585',
        alignItems: 'center',
        paddingTop: statusBarHeight / 1.5,
        flexDirection: 'row',
        justifyContent:'center'
    },
    body: {
        width: containerW,
        height: containerH / 8,
        flexDirection: 'row',
        backgroundColor: 'white',
    },

})
