import React from 'react';
import { Text, View } from 'react-native';
import { BOTTOM_TAB } from '../navigators/RouteName';

class LoginScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'red' }}>
        <Text onPress={()=>{this.props.navigation.navigate(BOTTOM_TAB)}}>Login Page</Text>
      </View>
    );
  }
}
export default LoginScreen;
