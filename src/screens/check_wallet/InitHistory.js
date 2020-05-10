import React from 'react';
import {
    View,
    Text
} from 'react-native';
import Header from '../../components/common/Header'
import { scale } from '../../constant/Scale';
import { PRIMARY_COLOR } from '../../constant/Colors';
import { texts } from '../../constant/CommonStyles';
class InitHistory extends React.Component {
    render() {
        let data = this.props.route.params.initHistory;
        return (
            <View>
                <Header navigation={this.props.navigation} back={true} title={'Tích điểm'} />
                <View style={{ width: "100%", height: "100%", backgroundColor: '#D3D3D3', borderRadius: scale(5) }}>
                    <View style={{ backgroundColor: 'white', width: "100%", height: "6%", borderBottomColor: 'gray', borderBottomWidth: scale(0.4), justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <View style={{ flex: 1, justifyContent: 'center', height: "100%", paddingLeft: scale(13) }}>
                            <Text style={{ fontSize: scale(14), color: 'gray' }}>Mã giao dịch</Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-end', height: "100%", paddingRight: scale(10) }}>
                            <Text style={{ fontSize: scale(14.5), textAlign: 'right' }}>{data.id}</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: 'white', width: "100%", height: "6%", justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <View style={{ flex: 1, justifyContent: 'center', height: "100%", paddingLeft: scale(13) }}>
                            <Text style={{ fontSize: scale(14), color: 'gray' }}>Thời gian</Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-end', height: "100%", paddingRight: scale(10) }}>
                            <Text style={{ fontSize: scale(14.5), textAlign: 'right' }}>{data.time}</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: 'white', width: "100%", height: "14%", justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: scale(6) }}>
                        <View style={{ flex: 1, justifyContent: 'center', height: "100%", paddingLeft: scale(13) }}>
                            <Text style={{ fontSize: scale(14), color: 'gray' }} >Nội dung</Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-end', height: "100%", paddingRight: scale(10) }}>
                            <Text style={{ fontSize: scale(14.5), textAlign: 'right' }} numberOfLines={5}>{data.note}</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: 'white', width: "100%", height: "6%", justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: scale(6) }}>
                        <View style={{ flex: 1, justifyContent: 'center', height: "100%", paddingLeft: scale(13) }}>
                            <Text style={{ fontSize: scale(14), color: 'gray' }}>Thay đổi</Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-end', height: "100%", paddingRight: scale(10) }}>
                            <Text style={{ fontSize: scale(14.5), textAlign: 'right' }}>{data.amount}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

}
export default InitHistory;