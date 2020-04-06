import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const demoToken = 'ff0f2d93-006d-3aaa-94ec-05ee1a1ff2af';

const _getHeader = async () => {
  const token = await AsyncStorage.getItem('access_token');
  if (token) {
    return {
      token: token
    };
  }
  return {
    token: demoToken
  };
};

export const callApi = async (method, url, input) => {
  const headers = await _getHeader();
  const configs = {
    headers:headers,
    method: method,
    url: url,
    data: input
  };
  await axios(configs).then((response)=>{

  }).catch((error)=>{
    console.error('call api error: ',error);
  })
};
