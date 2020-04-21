import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { BOTTOM_TAB, LOGIN } from '../navigators/RouteName';
import AsyncStorage from '@react-native-community/async-storage';
class BeginScreen extends React.Component {
    async componentDidMount() {
        const token_user = await AsyncStorage.getItem('access_token')
        console.log(token_user)
        if (token_user == 'none') {
            this.props.navigation.navigate(LOGIN)
        } else {
            this.props.navigation.navigate(BOTTOM_TAB)
        }

    }
    render() {

        return (
            <View style={{ flex: 1,backgroundColor:'red' }}>

            </View>
        );
    }

}
export default BeginScreen;