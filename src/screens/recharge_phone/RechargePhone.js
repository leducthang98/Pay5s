import React from 'react';
import {
    View,
    Text
} from 'react-native';
import Header from '../../components/common/Header';
import RechargePhoneTabView from './RechargePhoneTabView';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { getRechargePhoneService } from '../../actions/ActionHomeScreen';
export default class RechargePhone extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        // const token_user = await AsyncStorage.getItem('access_token')
        // this.props.getRechargePhoneService(token_user);
    }
    render() {
        console.log(this.props.rechargePhoneService)
        return (
            <View style={{ flex: 1 }}>
                <Header navigation={this.props.navigation} back={true} title={'Nạp tiền điện thoại'} />
                <RechargePhoneTabView navigation={this.props.navigation} />
            </View>
        );
    }

}
