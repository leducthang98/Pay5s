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
import {getTransfer} from '../../actions/ActionHomeScreen';
import {refreshStore} from '../../actions/ActionRefresh';
import {connect} from 'react-redux';
import {setPhoneNumberForRecharge} from '../../actions/ActionBillScreen';
import LoadingDialog from '../../components/common/LoadingDialog';
import {ActivityIndicator} from 'react-native-paper';

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: [],
      searchValue: '',
      isLoading: false,
    };
    this.contacts = [];
  }

  async componentDidMount() {
    if (Platform.OS === 'android') {
      await this._getPermissionAndroid();
    }
    await this._getAllContact();
  }

  _getAllContact = async () => {
    this.setState({isLoading: true});
    await this._loadAll();
    this.setState({isLoading: false});
  };

  _loadAll = async () => {
    Contacts.getAll((error, contacts) => {
      if (error === 'denied') {
        console.error('error when get contact = ', error);
      } else {
        console.log('contact = ', contacts);

        this.setState({searchResult: contacts});
        this.contacts = contacts;
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
    this.props.setPhoneNumber(phoneNumber);
    this.props.navigation.pop();
  };

  _onSearch = async (searchValue) => {
    this.setState({searchValue});
    const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    if (searchValue === '' || searchValue === null) {
      await this._getAllContact();
    } else if (phoneNumberRegex.test(searchValue)) {
      Contacts.getContactsByPhoneNumber(searchValue, (error, searchResult) => {
        this.setState({searchResult});
        if (error){
          console.log('error getContactsByPhoneNumber = ', error)
        }
      });
    } else {
      Contacts.getContactsMatchingString(searchValue, (error, searchResult) => {
        this.setState({searchResult});
        if (error){
          console.log('error getContactsMatchingString = ', error)
        }
      });
    }
  };

  _clearSearch = async () => {
    this.setState({searchValue: ''});
    await this._onSearch('');
  };

  render() {
    const {searchResult, searchValue, isLoading} = this.state;
    return (
      <View style={styles.container}>
        <Header back={true} title={'Danh sách liên lạc'} navigation={this.props.navigation}/>
        <SearchBox value={searchValue} onChangeText={this._onSearch} clearSearch={this._clearSearch}/>
        {
          isLoading ?
            <View style={styles.loadingView}>
              <ActivityIndicator
                size={'large'}
                color={COLOR.PRIMARY_COLOR}
              />
            </View>
            :
            <FlatList
              style={styles.list}
              data={searchResult}
              keyExtractor={item => item?.rawContactId}
              renderItem={({item, index}) =>
                <ContactItem
                  fullName={item?.displayName}
                  familyName={item?.familyName}
                  givenName={item?.givenName}
                  phoneNumber={item?.phoneNumbers[0]?.number}
                  chooseContact={phoneNumber => this._chooseContact(phoneNumber)}
                />
              }
            />
        }
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
  loadingView:{
    flex:1,
    alignItems: 'center',
    justifyContent:'center'
  }
});
const mapStateToProps = (store) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    setPhoneNumber: (phoneNumber) => {
      dispatch(setPhoneNumberForRecharge(phoneNumber));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
