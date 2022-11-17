import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../components/SignIn/SignInPhone';
import SignUp from '../pages/SignUp';

import TabNavigator from '../navigations/TabNaigator';
import Settings from '../pages/Settings';
import Orders from '../pages/Orders';
import Home from '../pages/Home';

import SignUpPhone from '../components/SignUp/SignUpPhone';
import SignUpAgree from '../components/SignUp/SignUpAgree';
import SignUpVerify from '../components/SignUp/SignUpVerify';
import SignUpName from '../components/SignUp/SignUpName';
import CheckName from '../components/Check/CheckName';
import LocationSetting from '../components/Location/LocationSetting';
import LocationSearch from '../components/Location/LocationSearch';
import LocationVerify from '../components/Location/LocationVerify';
import SignInPhone from '../components/SignIn/SignInPhone';
import SignInVerify from '../components/SignIn/SignInVerify';
import MainPage from '../pages/MainPage';
import Router from '../../Router';
import App from '../../App';
import MenuSearch from '../pages/MenuSearch';
import DetailPage from '../components/Menu/DetailPage';
import DetailOptionPage from '../components/Menu/DetailOptionPage';


const Stack = createNativeStackNavigator();

const StackNavigator = () => {

  return (

    <Stack.Navigator initialRouteName='Home'>
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
      <Stack.Screen name="SignInPhone"
        component={SignInPhone}
        options={{
          title: '로그인',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          }
        }} />
      <Stack.Screen name="SignInVerify"
        component={SignInVerify}
        options={{
          title: '휴대폰 인증',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          }
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
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="MyPage" component={Settings} />
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
          }
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
          }
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
          }
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
          }
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
          }
        }}
      />
    </Stack.Navigator>

  );
};

export default StackNavigator;