import React, { useEffect, useState, useLayoutEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text, View } from 'react-native';
import SignIn from '../pages/SignIn/SignInPhone';

import TabNavigator from '../navigations/TabNaigator';
import Home from '../pages/Home';

import SignUpPhone from '../pages/SignUp/SignUpPhone';
import SignUpAgree from '../pages/SignUp/SignUpAgree';
import SignUpVerify from '../pages/SignUp/SignUpVerify';
import SignUpName from '../pages/SignUp/SignUpName';
import CheckName from '../pages/Check/CheckName';
import LocationSetting from '../pages/Location/LocationSetting';
import LocationSearch from '../pages/Location/LocationSearch';
import LocationVerify from '../pages/Location/LocationVerify';
import SignInPhone from '../pages/SignIn/SignInPhone';
import SignInVerify from '../pages/SignIn/SignInVerify';
import MainPage from '../pages/MainPage';
import Router from '../../Router';
import App from '../../App';
import MenuSearch from '../pages/Menu/MenuSearch';
import DetailPage from '../pages/Menu/DetailPage';
import DetailOptionPage from '../pages/Menu/DetailOptionPage';

/* 수찬 */
import EventList from '../pages/MyPage/Event/EventList';
import EventDetail from '../pages/MyPage/Event/EventDetail';
import NoticeListPage from '../pages/MyPage/Notice/NoticeListPage';
import NoticeDetailPage from '../pages/MyPage/Notice/NoticeDetailPage';
import Inquire from '../pages/MyPage/Inquire/Inquire';
import ProfileChange from '../pages/MyPage/Profile/ProfileChange';
import UserPicksPage from '../pages/MyPage/UserPicks/UserPicksPage';
import PointHistory from '../pages/MyPage/Point/PointHistory';
import UserAlarm from '../pages/MyPage/Alarm/UserAlarm';
import NicknameChange from '../pages/MyPage/Profile/NicknameChange';
import EmailChange from '../pages/MyPage/Profile/EmailChange';

import CartList from '../pages/Cart/CartList';
import OrderList from '../pages/Order/OrderList';
import OrderStatus from '../pages/Order/OrderStatusPage';
import ReviewPage from '../pages/Review/ReviewPage';
import ReviewItem from '../pages/Review/ReviewItem';
import CountDownPage from '../pages/Order/CountDownPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OrderDetailPage from '../pages/Order/OrderDetailPage';

const Stack = createNativeStackNavigator();



const LoginSuccessNavigator = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useLayoutEffect(() => {
  }, [])

  return (
    <Stack.Navigator initialRouteName="LoginSuccess">
      {/* <Stack.Screen
        name="MainPage"
        component={MainPage}
        options={{
          headerShown: false,
        }}
      /> */}

      <Stack.Screen
        name="LocationSetting"
        component={LocationSetting}
        // options={{ headerShown: false }}
        options={{
          title: '주소 설정',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="MenuSearch"
        component={MenuSearch}
        options={{
          title: '메뉴 검색',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="DetailPage"
        component={DetailPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailOptionPage"
        component={DetailOptionPage}
        options={{
          title: '메뉴선택',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="CartList"
        component={CartList}
        options={{
          title: '카트 주문하기 🛒',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="OrderList"
        component={OrderList}
        options={{
          title: '결제하기',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="OrderStatus"
        component={OrderStatus}
        options={{
          title: '주문 현황',
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerTintColor: '#000000',
          headerStyle: {
            backgroundColor: '#F9FFFF',
          },
        }}
      />
      <Stack.Screen
        name="ReviewPage"
        options={{
          title: '',
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerTintColor: '#000000',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                setIsClicked(state => !state);
              }}>
              <Text>저장</Text>
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#F9FFFF',
          },
        }}>
        {props => <ReviewPage isClicked={isClicked} {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="ReviewItem"
        component={ReviewItem}
        options={{
          title: '리뷰👩🏻‍💻',
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerTintColor: '#000000',
          headerStyle: {
            backgroundColor: '#F9FFFF',
          },
        }}
      />
      <Stack.Screen
        name="CountDownPage"
        component={CountDownPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EventList"
        component={EventList}
        options={{
          title: '이벤트',
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerTintColor: '#000000',
          headerStyle: {
            backgroundColor: '#F9FFFF',
          },
        }}
      />
      <Stack.Screen
        name="EventDetail"
        component={EventDetail}
        options={{
          title: '이벤트',
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerTintColor: '#000000',
          headerStyle: {
            backgroundColor: '#F9FFFF',
          },
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: 'Urbanist',
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="NoticeListPage"
        component={NoticeListPage}
        options={{
          title: '공지사항',
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerTintColor: '#000000',
          headerStyle: {
            backgroundColor: '#F9FFFF',
          },
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: 'Urbanist',
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="NoticeDetailPage"
        component={NoticeDetailPage}
        options={{
          title: '공지사항 상세',
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerTintColor: '#000000',
          headerStyle: {
            backgroundColor: '#F9FFFF',
          },
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: 'Urbanist',
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Inquire"
        component={Inquire}
        options={{
          title: '문의하기',
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerTintColor: '#000000',
          headerStyle: {
            backgroundColor: '#F9FFFF',
          },
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: 'Urbanist',
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="UserPicksPage"
        component={UserPicksPage}
        options={{
          title: '찜한가게',
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerTintColor: '#000000',
          headerStyle: {
            backgroundColor: '#F9FFFF',
          },
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: 'Urbanist',
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="ProfileChange"
        component={ProfileChange}
        options={{
          title: '내 정보 관리',
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerTintColor: '#000000',
          headerStyle: {
            backgroundColor: '#F9FFFF',
          },
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: 'Urbanist',
            fontWeight: 'bold',
          },
          // headerRight: () => (
          //   <View style={{marginRight: 20}}>
          //     <Text
          //       style={{
          //         fontSize: 17,
          //         fontWeight: 'bold',
          //         color: '#000000',
          //       }}>
          //       저장
          //     </Text>
          //   </View>
          // ),
        }}
      />
      <Stack.Screen
        name="PointHistory"
        component={PointHistory}
        options={{
          title: '포인트 적립 및 사용내역',
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerTintColor: '#000000',
          headerStyle: {
            backgroundColor: '#F9FFFF',
          },
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: 'Urbanist',
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="UserAlarm"
        component={UserAlarm}
        options={{
          title: '알림 설정',
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerTintColor: '#000000',
          headerStyle: {
            backgroundColor: '#F9FFFF',
          },
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: 'Urbanist',
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="NicknameChange"
        component={NicknameChange}
        options={{
          title: '닉네임 변경',
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerTintColor: '#000000',
          headerStyle: {
            backgroundColor: '#F9FFFF',
          },
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: 'Urbanist',
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="EmailChange"
        component={EmailChange}
        options={{
          title: '이메일 변경',
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerTintColor: '#000000',
          headerStyle: {
            backgroundColor: '#F9FFFF',
          },
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: 'Urbanist',
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="LoginSuccess"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignInPhone"
        component={SignInPhone}
        options={{
          title: '로그인',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="SignInVerify"
        component={SignInVerify}
        options={{
          title: '휴대폰 인증',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
        }}
      />
      {/* <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: '회원가입',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          }
        }} /> */}
      <Stack.Screen
        name="SignUpAgree"
        component={SignUpAgree}
        options={{ headerShown: false }}
      // options={{
      //   title: '회원가입',
      //   headerTitleAlign: 'center',
      //   headerTitleStyle: {
      //     fontSize: 20,
      //     fontWeight: 'bold',
      //   }
      // }}
      />
      <Stack.Screen
        name="SignUpPhone"
        component={SignUpPhone}
        options={{ headerShown: false }}
      // options={{
      //   title: '휴대폰 인증',
      //   headerTitleAlign: 'center',
      //   headerTitleStyle: {
      //    fontSize: 20,
      //     fontWeight: 'bold',
      //   }
      // }}
      />
      <Stack.Screen
        name="SignUpVerify"
        component={SignUpVerify}
        options={{ headerShown: false }}
      // options={{
      //   title: '휴대폰 인증',
      //   headerTitleAlign: 'center',
      //   headerTitleStyle: {
      //    fontSize: 20,
      //     fontWeight: 'bold',
      //   }
      // }}
      />
      <Stack.Screen
        name="SignUpName"
        component={SignUpName}
        options={{ headerShown: false }}
      // options={{
      //   title: '휴대폰 인증',
      //   headerTitleAlign: 'center',
      //   headerTitleStyle: {
      //    fontSize: 20,
      //     fontWeight: 'bold',
      //   }
      // }}
      />
      <Stack.Screen
        name="CheckName"
        component={CheckName}
        options={{ headerShown: false }}
      // options={{
      //   title: '휴대폰 인증',
      //   headerTitleAlign: 'center',
      //   headerTitleStyle: {
      //    fontSize: 20,
      //     fontWeight: 'bold',
      //   }
      // }}
      />

      <Stack.Screen
        name="LocationSearch"
        component={LocationSearch}
        // options={{ headerShown: false }}
        options={{
          title: '주소 검색',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="LocationVerify"
        component={LocationVerify}
        // options={{ headerShown: false }}
        options={{
          title: '주소 확인',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="OrderDetailPage"
        component={OrderDetailPage}
        options={{
          title: '주문 상세',
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerTintColor: '#000000',
          headerStyle: {
            backgroundColor: '#F9FFFF',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default LoginSuccessNavigator;
