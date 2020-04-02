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
    handleSlide = type => {
        let {
            active,
            xTabOne,
            xTabTwo,
            translateX,
            translateXTabOne,
            translateXTabTwo
        } = this.state;
        Animated.spring(translateX, {
            toValue: type,
            duration: scale(100)
        }).start();
        if (active === 0) {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: 0,
                    duration: scale(100)
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: width,
                    duration: scale(100)
                }).start()
            ]);
        } else {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: -width,
                    duration: scale(100)
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: 0,
                    duration: scale(100)
                }).start()
            ]);
        }
    };
    render() {
        let {
            xTabOne,
            xTabTwo,
            translateX,
            active,
            translateXTabOne,
            translateXTabTwo,
            translateY
        } = this.state;
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

                <View
                    style={{
                        width: "100%",
                        marginTop: '-11.1%'
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: scale(40),
                            marginBottom: scale(20),
                            height: scale(36),
                            position: "relative"
                        }}
                    >
                        <Animated.View
                            style={{
                                position: "absolute",
                                width: "50%",
                                height: "100%",
                                top: 0,
                                left: 0,
                                backgroundColor: "#8ABAD3FF",
                                borderRadius: scale(4),
                                transform: [
                                    {
                                        translateX
                                    }
                                ]
                            }}
                        />
                        <TouchableOpacity style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: "#8ABAD3FF",
                            borderBottomLeftRadius: scale(4),
                            borderRightWidth: 0,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0
                        }}
                            onLayout={event =>
                                this.setState({
                                    xTabOne: event.nativeEvent.layout.x
                                })
                            }
                            onPress={() =>
                                this.setState({ active: 0 }, () =>
                                    this.handleSlide(xTabOne)
                                )
                            }
                        >
                            <Text
                                style={{
                                    color: active === 0 ? "#fff" : "#8ABAD3FF"
                                }}
                            >
                                Lịch sử
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: scale(1),
                                borderColor: "#8ABAD3FF",
                                borderBottomRightRadius: scale(4),
                                borderLeftWidth: 0,
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0
                            }}
                            onLayout={event =>
                                this.setState({
                                    xTabTwo: event.nativeEvent.layout.x
                                })
                            }
                            onPress={() =>
                                this.setState({ active: scale(1) }, () =>
                                    this.handleSlide(xTabTwo)
                                )
                            }
                        >
                            <Text
                                style={{
                                    color: active === scale(1) ? "#fff" : "#8ABAD3FF"
                                }}
                            >
                                Thông tin
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{ marginTop: "-3%" }}>
                        <Animated.View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                transform: [
                                    {
                                        translateX: translateXTabOne
                                    }
                                ]
                            }}
                            onLayout={event =>
                                this.setState({
                                    translateY: event.nativeEvent.layout.height
                                })
                            }
                        >
                            <View style={{ backgroundColor: 'red', width: '100%', height: scale(100) }}></View>
                        </Animated.View>

                        <Animated.View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                transform: [
                                    {
                                        translateX: translateXTabTwo
                                    },
                                    {
                                        translateY: -translateY
                                    }
                                ]
                            }}
                        >
                            <Text style={{ textAlign: 'left', textAlignVertical: 'center', width: '90%' }}>Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai </Text>
                            <Text style={{ textAlign: 'left', textAlignVertical: 'center', width: '90%' }}>2Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai </Text>
                            <Text style={{ textAlign: 'left', textAlignVertical: 'center', width: '90%' }}>2Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai </Text>
                            <Text style={{ textAlign: 'left', textAlignVertical: 'center', width: '90%' }}>2Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai Thắng đẹp trai </Text>


                        </Animated.View>
                    </ScrollView>
                </View>
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