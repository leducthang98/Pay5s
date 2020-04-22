import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
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
class NotiScreen extends React.Component {
  _renderNotification = (img_preview, img_avatar, headline, published_date, author, content, description) => (
    <TouchableOpacity
      onPress={() => this.props.navigation.navigate(INITNOTIFICATION, {
        dataNotification: {
          img_preview: img_preview,
          headline: headline,
          published_date: published_date,
          author: author,
          content: content,
          description: description,
          img_avatar: img_avatar
        }
      })}
    >
      <View style={{ width: containerW, height: scale(70), flexDirection: 'row', marginBottom: 5 }}>
        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ height: '75%', width: '80%' }}
            source={{
              uri:
                (img_avatar) ?
                  'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/p960x960/71949763_2522897797942478_4149955310162804736_o.jpg?_nc_cat=106&_nc_sid=85a577&_nc_ohc=zag8Z2YXtdMAX9BGZT4&_nc_ht=scontent-sin6-1.xx&_nc_tp=6&oh=081596cb6c9afc68b5bb83a069d5aa1a&oe=5EA9804A'
                  :
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Huaraz-prairie.JPG/300px-Huaraz-prairie.JPG'
            }}
          />
        </View>
        <View style={{ flex: 6, justifyContent: 'center' }}>
          <View style={{ height: '85%' }}>
            <Text
              numberOfLines={1}
              style={{ fontSize: scale(11.5), fontWeight: 'bold' }}
            >{headline}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: 'gray', fontSize: scale(9) }}>Pay5s - App</Text>
              <Text style={{ color: 'gray', fontSize: scale(9), paddingLeft: scale(10) }}>{published_date}</Text>
            </View>
            <Text
              numberOfLines={2}
              style={{ fontSize: scale(11), paddingTop: scale(2) }}
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
  render() {
    if (this.props.notiData) {
      const notiResponse = this.props.notiData
      if (notiResponse.errorCode === 200) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Header navigation={this.props.navigation} back={false} title={'Tin tức'} />
            <ScrollView>
              {
                notiResponse.data.rows.map((item, index) => {
                  let img_preview = item.img_preview;
                  let headline = item.headline;
                  let published_date = item.published_date;
                  let author = item.author;
                  let content = item.content;
                  let description = item.description;
                  let img_avatar = item.img_avatar;
                  return this._renderNotification(img_preview, img_avatar, headline, published_date, author, content, description)
                })
              }
            </ScrollView>
          </View>
        );
      } else if (notiResponse.errorCode === 500) {
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
    notiData: store.homeReducer.notiData
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    refreshStore: () => {
      dispatch(refreshStore())
    },

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NotiScreen);
