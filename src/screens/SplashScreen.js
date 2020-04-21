import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { BOTTOM_TAB, LOGIN } from '../navigators/RouteName';
import AsyncStorage from '@react-native-community/async-storage';
class SplashScreen extends React.Component {
    async componentDidMount() {
        const token_user = await AsyncStorage.getItem('access_token') || null;
        console.log(token_user);
        if (!token_user || token_user === 'none') {
            setTimeout(()=> this.props.navigation.navigate(LOGIN), 2000)
        } else {
            setTimeout(()=> this.props.navigation.navigate(BOTTOM_TAB), 2000)
        }
    }
    render() {
        return (
            <View style={{ flex: 1,backgroundColor:'red' }}>

            </View>
        );
    }

}
export default SplashScreen;
