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
import { scale } from '../../configs/Scale'
import { statusBarHeight } from '../../configs/Layout';
import AccountTabView from './AccountTabView';
const { width } = Dimensions.get("window");
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
export default class CheckWallet extends React.Component {
    state = {
        active: 0,
        xTabOne: 0,
        xTabTwo: 0,
        translateX: new Animated.Value(0),
        translateXTabOne: new Animated.Value(0),
        translateXTabTwo: new Animated.Value(width),
        translateY: -scale(1000)
    };
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <Text style={{ justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold', fontSize: scale(16) }}>Số dư ví thẻ</Text>
                </View>
                <View style={styles.body1}>
                    <View style={{flex:1,backgroundColor:'red'}}></View>
                    <View style={{flex:1,backgroundColor:'green'}}></View>
                    <View style={{flex:2,backgroundColor:'blue'}}></View>
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
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: statusBarHeight / 1.5,
    },
    body1: {
        width: containerW,
        height: containerH / 8,
        flexDirection: 'row',
        backgroundColor: 'white',
    },

})
