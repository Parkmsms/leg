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
      url: hosturi + '/locations',
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
      url: hosturi + '/locations',
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
      url: hosturi + '/locations/active',
      headers: {
        'content-type': 'application/json',
        Authorization: accessToken ? 'Bearer ' + accessToken : '',
      },
    });
    return result;
  } catch (err) {
    console.log("activeLocation Err", err)
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
    console.log("StoreList err", err)
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
    console.log("FoodKindList err", err)
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
      url: hosturi + `/menu?storeId=${id}`,
      headers: {
        'content-type': 'application/json',
        Authorization: accessToken ? 'Bearer ' + accessToken : '',
      },
    });
    return result;
  } catch (err) {
    throw console.log("대메뉴불러오기 에러", err);
  }
};

export const getSmallMenu = async (
  accessToken: string,
  storeId: number,
  menuId: number,
) => {
  try {
    console.log("가게번호:", storeId);
    console.log("메뉴번호", menuId)
    const result = await axios({
      method: 'get',
      url: hosturi + `/menu/${menuId}?storeId=${storeId}`,
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
export const EventDetailAPI = async (accessToken: string, id: number) => {
  try {
    const result = await axios({
      method: 'get', // GET
      url: hosturi + '/events/' + id, // URL
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
      url: hosturi + '/notices/' + id,
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

/* 유저 간략 정보 조회 */
export const UserSimpleAPI = async (accessToken: string) => {
  try {
    const result = await axios({
      method: 'get', // GET
      url: hosturi + '/users/simple', // URL
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

/* 유저 상세 정보 */
export const UserProfileAPI = async (accessToken: string) => {
  try {
    const result = await axios({
      method: 'get', // GET
      url: hosturi + '/users/detail', // URL
      headers: {
        'content-type': 'application/json',
        Authorization: accessToken ? 'Bearer ' + accessToken : '',
      },
    });
    console.log(result);
    return result;
  } catch (err) {
    throw err;
  }
};

/* 유저 닉네임 변경 */
export const UserNicknameChangeAPI = async (
  accessToken: string,
  nickname: string,
) => {
  try {
    const result = await axios({
      method: 'patch',
      url: hosturi + '/users/nickname',
      data: {
        nickname: nickname,
      },
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

/* 유저 픽 */
export const UserPicksAPI = async (accessToken: string) => {
  try {
    const result = await axios({
      method: 'get',
      url: hosturi + '/picks',
      headers: {
        'content-type': 'application/json',
        Authorization: accessToken ? 'Bearer ' + accessToken : '',
      },
    });
    console.log(result);
    return result;
  } catch (err) {
    throw err;
  }
};

/* 유저 포인트 이력 */
export const UserPointHistoryAPI = async (accessToken: string) => {
  try {
    const result = await axios({
      method: 'get', // GET
      url: hosturi + '/orders/points', // URL
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

/* 닉네임 체크 (닉네임 변경) */
export const checknameChange = async (
  nickname: string,
  accessToken: string,
) => {
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

/* 카트추가 */
export const CartPost = async (accessToken: string, cart: any) => {
  console.log('API', cart);
  try {
    const result = await axios({
      method: 'POST', // POST
      url: hosturi + '/carts', // URL
      headers: {
        'content-type': 'application/json',
        Authorization: accessToken ? 'Bearer ' + accessToken : '',
      },
      data: cart,
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const CartGet = async (accessToken: string, cartId: number) => {
  console.log('API cartId', cartId);
  try {
    const result = await axios({
      method: 'get', // GET
      url: hosturi + '/carts/' + cartId, // URL
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

export const pickStore = async (accessToken: string, postId: number) => {
  console.log(postId);

  try {
    const result = await axios({
      method: 'POST', // POST
      url: hosturi + '/picks',
      params: {
        postId: postId,
      },
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

export const deletepickStore = async (accessToken: string, postId: number) => {
  try {
    const result = await axios({
      method: 'DELETE', // POST
      url: hosturi + '/picks',
      params: {
        postId: postId,
      },
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

export const getCompleteOrderListAPI = async (accessToken: string) => {
  try {
    const result = await axios({
      method: 'get', // GET
      url: hosturi + '/orders/off', // URL
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

export const getInProgressOrderListAPI = async (accessToken: string) => {
  try {
    const result = await axios({
      method: 'get', // GET
      url: hosturi + '/orders/on', // URL
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

//review 사진 3개
export const topImage3 = async (accessToken: string, storeId: number) => {
  console.log("storeId=", storeId)
  try {
    const result = await axios({
      method: 'get',
      url: hosturi + `/reviews/images/top3?storedId=${storeId}`,
      headers: {
        'content-type': 'application/json',
        Authorization: accessToken ? 'Bearer ' + accessToken : '',
      },
    });
    return result;
  } catch (err) {
    throw console.log("error 입니다", err);
  }
};

export const getDistanceAPI = async (
  accessToken: string,
  param: any,
  storeId: number,
) => {
  try {
    const result = await axios({
      method: 'get',
      url:
        hosturi +
        `/stores/${storeId}/distance?lng=${param.lng}&lat=${param.lat}`,
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

export const getOrderSimpleAPI = async (
  accessToken: string,
  orderId: number,
) => {
  try {
    const result = await axios({
      method: 'get',
      url: hosturi + `/orders/${orderId}/simple`,
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

export const getCouponList = async (accessToken: string) => {
  try {
    const result = await axios({
      method: 'get',
      url: hosturi + '/coupons',
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

//박문수 주문완료처리 api
export const orderFinishAPI = async (accessToken: string, orderId: number) => {
  try {
    const result = await axios({
      method: 'post',
      url: hosturi + `/orders/${orderId}/finish`,
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
//주문 취소 api
export const orderCancleAPI = async (accessToken: string, orderId: number) => {
  try {
    const result = await axios({
      method: 'post',
      url: hosturi + `/orders/${orderId}/cancel`,
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
//리뷰조회
export const getReviewAPI = async (accessToken: string, storeId: number) => {
  try {
    const result = await axios({
      method: 'get',
      url: hosturi + `/reviews?storeId=${storeId}`,
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

export const SaveReviewAPI = async (accessToken: string, picture: any, data: any) => {
  const formData = new FormData();
  formData.append('images', { uri: picture.url, name: picture.fileName, type: picture.type });

  const dataString = JSON.stringify(data);
  const blob = new Blob([dataString], { type: "application/json", lastModified: 0 })

  //Blob jsonObj Append
  formData.append('reqDto', blob);


  try {
    const result = await axios({
      method: 'post',
      url: hosturi + '/reviews',
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: accessToken ? 'Bearer ' + accessToken : '',
      },
      transformRequest: (data, headers) => {
        return data;
      },
      data: formData
    });
    return result;
  } catch (err) {
    throw err;
  }
};
