import React from 'react';
import rootReducer from './src/reducers/RootReducer';
import rootSaga from './src/sagas/RootSaga';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import RootNavigator from './src/navigators/RootNavigator';
import {
  StyleSheet,
  View,
  Dimensions,
    StatusBar,
} from 'react-native';
const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger))
sagaMiddleware.run(rootSaga)
const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>

        <StatusBar backgroundColor={'transparent'} translucent={true} barStyle={'dark-content'}/>
        <RootNavigator />
      </View>
    </Provider>
  );
};
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    width: containerW,
    height: containerH,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
  },
});
export default App;

