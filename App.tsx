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
import React, { useEffect,useState } from 'react';
import Router from './Router';
//FBM
import messaging from '@react-native-firebase/messaging';
import LottieView from 'lottie-react-native';



const App = () => {
  const [appLoaded, setAppLoaded] = useState(true); //앱 로딩된 상태인가요?

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {

    console.log("리모트 메시지=",remoteMessage);
    //  여기에 로직을 작성한다.
    //  remoteMessage.data로 메세지에 접근가능
    //  remoteMessage.from 으로 topic name 또는 message identifier
    //  remoteMessage.messageId 는 메시지 고유값 id
    //  remoteMessage.notification 메시지와 함께 보내진 추가 데이터
    //  remoteMessage.sentTime 보낸시간
  });

  // useEffect(() => {
  //   try {
  //     setTimeout(() => {
  //       SplashScreen.hide();
  //     }, 5000); //스플래시 활성화 시간 2초
  //   } catch (e: any) {
  //     console.log(e.message);
  //   }
  // })

  useEffect(() => {
    SplashScreen.hide(); // splash screen은 바로 감춥니다!
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setAppLoaded(false);
    }, 5000); // 3초간 appLoaded 상태가 false이기 때문에
  }, []);

  return  appLoaded ? (
    <LottieView
      style={{flex: 1}}
      source={require('./src/assets/lottie/animation_lelbw9wc')}
      autoPlay
      loop
    /> 
  )  : (<Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
