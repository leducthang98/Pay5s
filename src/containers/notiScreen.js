import React from 'react';
import { Text, View } from 'react-native';
class NotiScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'red' }}>
        <Text>Noti Page</Text>
      </View>
    );
  }
}
export default NotiScreen;