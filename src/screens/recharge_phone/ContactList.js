import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  StyleSheet,
  PermissionsAndroid
} from 'react-native';
import Contacts from 'react-native-contacts';
import * as COLOR from '../../constant/Colors';
import Header from '../../components/common/Header';

export default class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      this._getPermissionAndroid();
    }
  }

  _getPermissionAndroid = () => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        'title': 'Contacts',
        'message': 'This app would like to view your contacts.',
        'buttonPositive': 'Please accept bare mortal'
      }
    ).then(() => {
      Contacts.getAll((err, contacts) => {
        if (err === 'denied') {
          // error
        } else {
          // contacts returned in Array
          console.log('contacts = ', contacts);
        }
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header back={true} title={'Danh sách liên lạc'} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLOR.BACKGROUND_COLOR,
  }
});