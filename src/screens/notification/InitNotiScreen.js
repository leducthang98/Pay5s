import React from 'react';
import {
    View,
    Text
} from 'react-native';
import Header from '../../components/common/Header'
class InitNotiScreen extends React.Component {
    render() {
        let data = this.props.route.params;
        return (
            <View style={{ flex: 1 }}>
                <Header navigation={this.props.navigation} back={true} title={'Chi tiết'} />
                <Text>{data.dataNotification.published_date}</Text>
            </View>
        );
    }

}
export default InitNotiScreen;