import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from "./src/navigations/TabNaigator";
import StackNavigator from "./src/navigations/StackNavigator";
import LoginSuccessNavigator from "./src/navigations/LoginSuccessNavigator";
import Toast from 'react-native-toast-message'



const Router = () => {
  const [isLog, setIsLog] = useState<boolean>(false);

  const getToken = async () => {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    console.log("refreshToken", refreshToken);

    const token = await AsyncStorage.getItem('accessToken');
    console.log("accessToken", token);
    if (token) {
      setIsLog(true)
    } else {
      setIsLog(false)
    }
  }

  useEffect(() => {
    getToken()
  })

  return (
    <NavigationContainer>
      {isLog == true && <LoginSuccessNavigator />}
      {isLog == false && <StackNavigator />}
    </NavigationContainer>
  )
}
export default Router;