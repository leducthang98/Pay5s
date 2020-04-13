import React from 'react';
import {
    View,
    Text
} from 'react-native';
import Header from '../../components/common/Header';
import RechargePhoneTabView from './RechargePhoneTabView';
import { connect } from 'react-redux';
import { getRechargePhoneService } from '../../actions/ActionHomeScreen';
class RechargePhone extends React.Component {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        this.props.getRechargePhoneService();
    }
    render() {
       console.log(this.props.rechargePhoneService)
        return (
            <View style={{ flex: 1 }}>
                <Header navigation={this.props.navigation} back={true} title={'Nạp tiền điện thoại'} />
                <RechargePhoneTabView />
            </View>
        );
    }

}

const mapStateToProps = (store) => {
    return {
        rechargePhoneService: store.homeReducer.rechargePhoneService
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getRechargePhoneService: () => {
            dispatch(getRechargePhoneService())
        },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RechargePhone);
