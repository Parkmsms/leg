import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import EventList from '../pages/InTheEvent/EventList';
import CartList from '../pages/Cart/CartList';
import OrderList from '../pages/Order/OrderList';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      {/* <Stack.Screen
        name="MainPage"
        component={MainPage}
        options={{
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="LoginSucess"
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
    </Stack.Navigator>
  );
};

export default StackNavigator;
