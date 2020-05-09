import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
  RefreshControl,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import Loading from '../../components/common/Loading';
import Header from '../../components/common/Header';
import { scale } from '../../constant/Scale';
import { INITNOTIFICATION, LOGIN } from '../../navigators/RouteName';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import { refreshStore } from '../../actions/ActionRefresh';
import {GRAY_FONTCOLOR} from '../../constant/Colors';
import { getNotification } from '../../actions/ActionHomeScreen';
class NotiScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    }
  }
  _renderNotification = (img_preview, img_avatar, headline, published_date, author, content, description, defaultImage) => (
    <TouchableOpacity
      onPress={() => this.props.navigation.navigate(INITNOTIFICATION, {
        dataNotification: {
          img_preview: img_preview,
          headline: headline,
          published_date: published_date,
          author: author,
          content: content,
          description: description,
          img_avatar: img_avatar,
          defaultImage: defaultImage
        }
      })}
      style={{ width: containerW, height: scale(97), borderBottomWidth: scale(0.5), borderColor: 'gray',backgroundColor:'white' }}
    >
      <View style={{ flexDirection: 'row', width: '100%', height: '100%' }}>
        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ height: '90%', width: '90%' }}
            resizeMode={'contain'}
            source={{
              uri:
                (img_avatar) ?
                  'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/p960x960/71949763_2522897797942478_4149955310162804736_o.jpg?_nc_cat=106&_nc_sid=85a577&_nc_ohc=zag8Z2YXtdMAX9BGZT4&_nc_ht=scontent-sin6-1.xx&_nc_tp=6&oh=081596cb6c9afc68b5bb83a069d5aa1a&oe=5EA9804A'
                  :
                  defaultImage
            }}
          />
        </View>
        <View style={{ flex: 6, justifyContent: 'center', paddingTop: scale(5) }}>
          <View style={{ height: '100%' }}>
            <Text
              numberOfLines={2}
              style={{ fontSize: scale(15), fontWeight: 'bold' }}
            >{headline}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: GRAY_FONTCOLOR, fontSize: scale(11) }}>Pay5s - App</Text>
              <Text style={{ color: GRAY_FONTCOLOR, fontSize: scale(11), paddingLeft: scale(10) }}>{published_date}</Text>
            </View>
            <Text
              numberOfLines={2}
              style={{ fontSize: scale(12), paddingTop: scale(2) }}
            >- {description}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  async tokenInvalidFunction() {
    this.props.refreshStore();
    await AsyncStorage.clear();
    Toast.show("Phiên đăng nhập đã hết hạn, bạn sẽ được quay trở về trang đăng nhập.")
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: LOGIN }],
      })
    );
  }
  async _onRefresh() {
    const token_user = await AsyncStorage.getItem('access_token');
    this.setState({
      ...this.state,
      refreshing: true
    })
    this.props.getNotification(token_user)
    this.setState({
      ...this.state,
      refreshing: false
    })
  }

  render() {
    if (this.props.notiData && this.props.commonConfigData) {
      const notiResponse = this.props.notiData
      const commonResponse = this.props.commonConfigData;
      if (notiResponse.errorCode === 200 && commonResponse.errorCode === 200) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Header navigation={this.props.navigation} back={false} title={'Tin tức'} />
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this._onRefresh()} />}
            >
              {
                notiResponse.data.rows.map((item, index) => {
                  let img_preview = item.img_preview;
                  let headline = item.headline;
                  let published_date = item.published_date;
                  let author = item.author;
                  let content = item.content;
                  let description = item.description;
                  let img_avatar = item.img_avatar;
                  let defaultImage = commonResponse.data.banner.default
                  return this._renderNotification(img_preview, img_avatar, headline, published_date, author, content, description, defaultImage)
                })
              }
            </ScrollView>
          </View>
        );
      } else if (notiResponse.errorCode === 500 || commonResponse.errorCode === 500) {
        this.tokenInvalidFunction();
        return null;
      }
    } else {
      return (
        <Loading></Loading>
      );
    }
  }
}
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
const mapStateToProps = (store) => {
  return {
    notiData: store.homeReducer.notiData,
    commonConfigData: store.homeReducer.commonConfigData
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    refreshStore: () => {
      dispatch(refreshStore())
    },
    getNotification: (token_user) => {
      dispatch(getNotification(token_user))
    },

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NotiScreen);
