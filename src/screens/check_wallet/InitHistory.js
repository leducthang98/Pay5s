import React from 'react';
import {
    View,
    Text
} from 'react-native';
import Header from '../../components/common/Header'
class InitHistory extends React.Component {
    render() {
        let data = this.props.route.params;
        return (
            <View style={{ flex: 1 }}>
                <Header navigation={this.props.navigation} back={true} title={'Tích điểm'} />
                <Text>Tích điểm</Text>
            </View>
        );
    }

}
export default InitHistory;