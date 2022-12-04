import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Agree } from '../models/agreeInfo';
import { Device } from '../models/deviceInfo';
import { PostLocation } from '../models/locationInfo';
import { StoreParams } from '../models/listfilterInfo';

const hosturi = 'http://0giri.com/api';

export const getAccessToken = async (data: string) => {
  const accessToken = (await AsyncStorage.getItem(data)) || '';
  return accessToken;
};

export const authphone = async (phone: string) => {
  console.log(phone);

  try {
    const result = await axios({
      method: 'POST',
      url: hosturi + '/auth/phone',
      // header: await AsyncStorage.getItem('session'), JWT 토큰 헤더에 담는 방법
      data: {
        phone: phone,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const existphone = async (phone: string) => {
  try {
    const result = await axios({
      method: 'post',
      url: hosturi + '/users/phone/dup',
      // header: await AsyncStorage.getItem('session'), JWT 토큰 헤더에 담는 방법
      data: {
        phone: phone,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const checkname = async (nickname: string) => {
  try {
    const result = await axios({
      method: 'post',
      url: hosturi + '/users/nickname/dup',
      // header: await AsyncStorage.getItem('session'), JWT 토큰 헤더에 담는 방법
      data: {
        nickname: nickname,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const checkuser = async (nickname: string, phone: string) => {
  try {
    const result = await axios({
      method: 'post',
      url: hosturi + '/auth/nickname',
      // header: await AsyncStorage.getItem('session'), JWT 토큰 헤더에 담는 방법
      data: {
        nickname: nickname,
        phone: phone,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const changeuser = async (phone: string, deviveToken: string) => {
  try {
    const result = await axios({
      method: 'patch',
      url: hosturi + '/users/device',
      // header: await AsyncStorage.getItem('session'), JWT 토큰 헤더에 담는 방법
      data: {
        phone: phone,
        deviveToken: deviveToken,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const register = async (
  phone: string,
  nickname: string,
  deviceToken: string,
  userPolicyTerms: Agree,
) => {
  try {
    const result = await axios({
      method: 'post',
      url: hosturi + '/users',
      // header: await AsyncStorage.getItem('session'), JWT 토큰 헤더에 담는 방법
      data: {
        phone: phone,
        nickname: nickname,
        deviceToken: deviceToken,
        policyTerms: userPolicyTerms,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const login = async (phone: string, deviceToken: string) => {
  try {
    const result = await axios({
      method: 'post',
      url: hosturi + '/auth/login/user',
      // header: await AsyncStorage.getItem('session'), JWT 토큰 헤더에 담는 방법
      data: {
        phone: phone,
        deviceToken: deviceToken,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

//위치설정
export const location = async (data: PostLocation, accessToken: string) => {
  console.log('axios', data);
  console.log(accessToken);

  try {
    const result = await axios({
      method: 'post',
      url: hosturi + '/users/locations',
      headers: {
        'content-type': 'application/json',
        Authorization: accessToken ? 'Bearer ' + accessToken : '',
      },
      // header: await AsyncStorage.getItem('session'), JWT 토큰 헤더에 담는 방법
      data: {
        alias: data.alias,
        isMarked: data.isMarked,
        address: {
          regionAddress: data.address.regionAddress,
          roadAddress: data.address.roadAddress,
          locationName: data.address.locationName,
          depth1: data.address.depth1,
          depth2: data.address.depth2,
          depth3: data.address.depth3,
          detail: data.address.detail,
          lng: data.address.lng,
          lat: data.address.lat,
        },
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

//내 위치설정
export const mylocation = async (accessToken: string) => {
  console.log(accessToken);

  try {
    const result = await axios({
      method: 'get',
      url: hosturi + '/users/locations',
      headers: {
        'content-type': 'application/json',
        Authorization: accessToken ? 'Bearer ' + accessToken : '',
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const activeLocation = async (accessToken: string) => {
  try {
    const result = await axios({
      method: 'get',
      url: hosturi + '/users/locations/active',
      headers: {
        'content-type': 'application/json',
        Authorization: accessToken ? 'Bearer ' + accessToken : '',
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const getStoreList = async (
  accessToken: string,
  params: StoreParams,
) => {
  try {
    const result = await axios({
      method: 'get',
      url: hosturi + '/posts',
      params: params,
      headers: {
        'content-type': 'application/json',
        Authorization: accessToken ? 'Bearer ' + accessToken : '',
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const getBannerList = async (accessToken: string) => {
  try {
    const result = await axios({
      method: 'get',
      url: hosturi + '/banners',
      headers: {
        'content-type': 'application/json',
        Authorization: accessToken ? 'Bearer ' + accessToken : '',
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const getFoodKindsList = async (accessToken: string) => {
  try {
    const result = await axios({
      method: 'get',
      url: hosturi + '/kinds',
      headers: {
        'content-type': 'application/json',
        Authorization: accessToken ? 'Bearer ' + accessToken : '',
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const getStoreInfo = async (accessToken: string, id: number) => {
  try {
    const result = await axios({
      method: 'get',
      url: hosturi + '/posts/' + id + '/info',
      headers: {
        'content-type': 'application/json',
        Authorization: accessToken ? 'Bearer ' + accessToken : '',
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const getStoreMenu1 = async (accessToken: string, id: number) => {
  try {
    const result = await axios({
      method: 'get',
      url: hosturi + '/posts/' + id + '/menu',
      headers: {
        'content-type': 'application/json',
        Authorization: accessToken ? 'Bearer ' + accessToken : '',
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const getStoreMenu2 = async (accessToken: string, storeId: number, menuId: number,) => {
  try {
    const result = await axios({
      method: 'get',
      url: hosturi + '/posts/' + storeId + '/menu/' + menuId,
      headers: {
        'content-type': 'application/json',
        Authorization: accessToken ? 'Bearer ' + accessToken : '',
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

/* 공지사항 목록 */
export const NoticeListAPI = async (accessToken: string) => {
  try {
    const result = await axios({
      method: 'get', // GET
      url: hosturi + '/notices', // URL
      headers: {
        'content-type': 'application/json',
        Authorization: accessToken ? 'Bearer ' + accessToken : '',
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

/* 공지사항 상세 */
export const NoticeDetailAPI = async (accessToken: string, id: number) => {
  try {
    const result = await axios({
      method: 'get',
      url: hosturi + '/notices/',

      headers: {
        'content-type': 'application/json',
        Authorization: accessToken ? 'Bearer ' + accessToken : '',
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

/* 이벤트 목록 */
export const EventListAPI = async (accessToken: string) => {
  try {
    const result = await axios({
      method: 'get', // GET
      url: hosturi + '/events', // URL
      headers: {
        'content-type': 'application/json',
        Authorization: accessToken ? 'Bearer ' + accessToken : '',
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

/* 이벤트 상세 */
export const EventDetailAPI = async (accessToken: string) => {
  try {
    const result = await axios({
      method: 'get', // GET
      url: hosturi + '/events/', // URL
      headers: {
        'content-type': 'application/json',
        Authorization: accessToken ? 'Bearer ' + accessToken : '',
      },
      params: {
        eventId: 2,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};


/* 카트추가 */
export const CartPost = async (accessToken: string, postId: number, itemSets: any) => {
  try {
    const result = await axios({
      method: 'POST', // POST
      url: hosturi + '/carts', // URL
      headers: {
        'content-type': 'application/json',
        Authorization: accessToken ? 'Bearer ' + accessToken : '',
      },
      data: {
        postId: postId,
        itemSets: itemSets
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};