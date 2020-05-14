import React from 'react';
import {
    View,
    Text,
    Image,
    Dimensions
} from 'react-native';
import Header from '../../components/common/Header'
import { ScrollView } from 'react-native-gesture-handler';
import { scale, scaleVertical, scaleModerate } from '../../constant/Scale';
import { PRIMARY_COLOR, FACEBOOK } from '../../constant/Colors'
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
import { WebView } from 'react-native-webview';
class InitNotiScreen extends React.Component {
    render() {

        let data = this.props.route.params;
        return (
            <View style={{ flex: 1,backgroundColor:'white' }}>
                <Header navigation={this.props.navigation} back={true} title={'Chi tiết'} />
                <ScrollView>
                    <View style={{ width: containerW, height: containerH / 3.5, alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ height: '100%', width: '100%' }}
                        resizeMode={'contain'}
                            source={{
                                uri:
                                    (data.dataNotification.img_preview) ?
                                        data.dataNotification.img_preview
                                        :
                                        data.dataNotification.defaultImage
                            }}
                        />
                    </View>
                    <View style={{ width: containerW, marginTop: scaleVertical(30),paddingLeft:scale(10),paddingRight:scale(10) }}>
                        <Text style={{ fontSize: scale(20), fontWeight: 'bold', color: FACEBOOK }}>{data.dataNotification.headline}</Text>
                        <View style={{ flexDirection: 'row', marginTop: scale(10) }}>
                            <Text style={{ color: 'gray', fontSize: scaleModerate(12) }}>{data.dataNotification.published_date}</Text>
                        </View>
                        <View style={{ marginTop: scale(10) }}>
                            <Text style={{ fontSize: scale(16) }}>{data.dataNotification.description}</Text>
                        </View>
                      
                        <View style={{ marginTop: scale(10) }}>
                        {/* <WebView style={{width:containerW,height:scale(1000)}} source={{ html:data.dataNotification.content }} /> */}
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: scaleVertical(30) }}>
                            <Text style={{ fontSize: scale(16), fontWeight: 'normal' }}> {data.dataNotification.content} </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: scaleVertical(30) }}>
                            <Text style={{ fontSize: scaleModerate(16), fontWeight: 'bold' }}> {data.dataNotification.author} </Text>
                        </View>
                        <View style={{ marginTop: scaleVertical(20), height: scale(10) }}>

                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

}
export default InitNotiScreen;