import React, { Component } from 'react';
import rootReducer from './src/reducers/RootReducer';
import rootSaga from './src/sagas/RootSaga';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import RootNavigator from './src/navigators/RootNavigator';
import OneSignal from 'react-native-onesignal';
import {
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  SafeAreaView
} from 'react-native';
const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger))
sagaMiddleware.run(rootSaga)
export default class App extends Component {
  constructor(props) {
    super(props);
    //Remove this method to stop OneSignal Debugging
    OneSignal.setLogLevel(6, 0);
    // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
    OneSignal.init("d4ffe850-f047-4f05-a3e2-d71ab16241e4", { kOSSettingsKeyAutoPrompt: false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption: 2 });
    // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
    OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.inFocusDisplaying(2);
  }
  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  render() {
    return (
      <Provider store={store}>
 
      {/*  <View style={styles.container}>*/}
          {/* <StatusBar barStyle={'light-content'} /> */}
          <RootNavigator />
        {/*</View>*/}
      
      </Provider>
    );
  }
};
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    width: containerW,
    height: containerH,
    // alignItems: 'center',
    // flexDirection: 'row',
    backgroundColor: '#FAFAFA',
  },
});

function myiOSPromptCallback(permission) {
  // do something with permission value
}


