import React, {Component} from 'react';
import {
  View,
  FlatList,
  Platform,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import Contacts from 'react-native-contacts';
import * as COLOR from '../../constant/Colors';
import Header from '../../components/common/Header';
import SearchBox from '../../components/recharge/SearchBox';
import {scaleModerate} from '../../constant/Scale';
import ContactItem from '../../components/recharge/ContactItem';
import AsyncStorage from '@react-native-community/async-storage';

export default class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    };
  }

  async componentDidMount() {
    if (Platform.OS === 'android') {
      await this._getPermissionAndroid();
      await this._getAllContact();
    }
  }

  _getAllContact = async () => {
    Contacts.getAll((error, contacts) => {
      if (error === 'denied') {
        console.error('error when get contact = ', error);
      } else {
        this.setState({contacts});
      }
    });
  };

  _getPermissionAndroid = async () => {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        'title': 'Danh bạ',
        'message': 'Ứng dụng cần được truy cập vào danh bạ của bạn để tiếp tục',
        'buttonPositive': 'Chấp nhận',
      },
    );
  };

  _chooseContact = async phoneNumber => {
    await AsyncStorage.setItem('phone_number_selected', phoneNumber);
    this.props.navigation.pop()
  };

  render() {
    const {contacts} = this.state;
    console.log('contact list = ', contacts);
    return (
      <View style={styles.container}>
        <Header back={true} title={'Danh sách liên lạc'}/>
        <SearchBox/>
        <FlatList
          style={styles.list}
          data={contacts}
          keyExtractor={item => item?.rawContactId}
          renderItem={({item, index}) =>
            <ContactItem
              fullName={item?.displayName}
              givenName={item?.givenName}
              phoneNumber={item?.phoneNumbers[0]?.number}
              chooseContact={phoneNumber => this._chooseContact(phoneNumber)}
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLOR.BACKGROUND_COLOR,
    paddingHorizontal: scaleModerate(10),
  },
  list: {
    width: '100%',
  },
});
