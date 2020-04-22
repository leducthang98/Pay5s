import React from 'react';
import {
    View,
    Text
} from 'react-native';
import Header from '../../components/common/Header';
import RechargePhoneTabView from './RechargePhoneTabView';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {getRechargePhoneServiceAPI} from '../../fetchAPIs/getRechargePhoneServiceAPI';
import LoadingDialog from '../../components/common/LoadingDialog';
import MessageDialog from '../../components/common/MessageDialog';
export default class RechargePhone extends React.Component {
    constructor(props) {
        super(props);
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
