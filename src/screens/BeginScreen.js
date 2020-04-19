import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { BOTTOM_TAB, LOGIN } from '../navigators/RouteName';
import AsyncStorage from '@react-native-community/async-storage';
class BeginScreen extends React.Component {
    async componentDidMount() {
        const storageData = await AsyncStorage.getAllKeys();
        console.log('ComponentDidMount...')
        if (storageData.length == 0) {
            this.props.navigation.navigate(LOGIN)
        } else {
            this.props.navigation.navigate(BOTTOM_TAB)
        }

    }
    render() {

        return (
            <View style={{ flex: 1 }}>

            </View>
        );
    }

}
export default BeginScreen;