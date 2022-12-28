import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from "./src/navigations/TabNaigator";
import StackNavigator from "./src/navigations/StackNavigator";


const Router = () => {


  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  )
}
export default Router;