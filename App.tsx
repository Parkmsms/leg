/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import store from './src/store';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import React, { useEffect } from 'react';
import Router from './Router';


const App = () => {

  useEffect(() => {
    try {
      setTimeout(() => {
        SplashScreen.hide();
      }, 5000); //스플래시 활성화 시간 2초
    } catch (e: any) {
      console.log(e.message);
    }
  })

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
