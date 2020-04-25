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
import { PRIMARY_COLOR,FACEBOOK } from '../../constant/Colors'
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
class InitNotiScreen extends React.Component {
    render() {
        let data = this.props.route.params;
        return (
            <View style={{ flex: 1 }}>
                <Header navigation={this.props.navigation} back={true} title={'Chi tiết'} />
                <ScrollView>
                    <View style={{ width: containerW, height: containerH / 3.5, alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ height: '90%', width: '85%' }}
                            source={{
                                uri:
                                    (data.dataNotification.img_preview) ?
                                        'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/p960x960/71949763_2522897797942478_4149955310162804736_o.jpg?_nc_cat=106&_nc_sid=85a577&_nc_ohc=zag8Z2YXtdMAX9BGZT4&_nc_ht=scontent-sin6-1.xx&_nc_tp=6&oh=081596cb6c9afc68b5bb83a069d5aa1a&oe=5EA9804A'
                                        :
                                        data.dataNotification.defaultImage
                            }}
                        />
                    </View>
                    <View style={{ width: containerW, paddingLeft: scale(16), marginTop: scaleVertical(30) }}>
                        <Text style={{ fontSize: scale(20), fontWeight: 'bold', color: FACEBOOK }}>{data.dataNotification.headline}</Text>
                        <View style={{ flexDirection: 'row', marginTop: scale(10) }}>
                            <Text style={{ color: 'gray', fontSize: scaleModerate(12) }}>{data.dataNotification.published_date}</Text>
                            <Text style={{ color: 'gray', fontSize: scaleModerate(12), paddingLeft: scale(15) }} >Pay5s - App</Text>
                        </View>
                        <View style={{ marginTop: scale(10) }}>
                            <Text style={{ fontSize: scale(16) }}>{data.dataNotification.description}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: scaleVertical(30) }}>
                            <Text style={{ fontSize: scaleModerate(14), fontWeight: 'bold' }}> {data.dataNotification.author} </Text>
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