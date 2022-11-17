import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from "./src/navigations/TabNaigator";
import StackNavigator from "./src/navigations/StackNavigator";


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
    AsyncStorage.removeItem('accessToken');
    AsyncStorage.removeItem('refreshToken');
    getToken()
  })

  return (
    <NavigationContainer>
      {isLog ?
        <TabNavigator />
        : <StackNavigator />
      }
    </NavigationContainer>
  )
}
export default Router;