import React, { useEffect, useState } from "react"
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { changeuser, checkuser } from "../../config/AxiosFunction"
import DeviceInfo from 'react-native-device-info';
import { Device } from "../../models/deviceInfo";
import Header from "../../components/Header/HeaderImage";

type CheckName = {
  navigation?: any,
  route: any
}
const CheckName = ({ navigation, route }: CheckName) => {
  const [nickname, setNickname] = useState<string>('');

  const [deviceInfo, setDeviceInfo] = useState<Device>({
    deviceToken: '',
    // deviceType: '',
    // isNotificationAgreement: false,
    // isAdAgreement: false,
    // isNightAdAgreement: false,
  });

  const settingDeviceInfo = () => {
    // try {
    //   deviceInfo.deviceToken = DeviceInfo.getDeviceId()
    // } catch (e) {
    //   console.log(
    //     'Unable to get device token.Either simulator or not iOS11 + ',
    //   );
    // }

    setDeviceInfo({
      deviceToken: DeviceInfo.getDeviceId() + 1,
      // deviceType: DeviceInfo.getSystemName() === 'Android' ? 'GCM' : 'APNS',
      // isNotificationAgreement: true,
      // isAdAgreement: false,
      // isNightAdAgreement: false,
    })
  };
  // useEffect(() => {

  // }, [])

  useEffect(() => {
    settingDeviceInfo();
  }, [])

  const CheckUser = async () => {
    const response = await checkuser(nickname, route.params?.phone);
    console.log(response.data);

    if (response.data == false) {
      Alert.alert('닉네임 입력이 틀렸습니다. 문의해주세요')
      navigation.navigate('Home')
    } else {

      try {
        const response = await changeuser(route.params?.phone, deviceInfo.deviceToken)
        if (response.status === 200) {
          console.log('로그인 성공', response.status);
          navigation.navigate('Home')
        }

      } catch {
        console.log('로그인 실패', response.status);
        navigation.navigate('Home')
      }
    }
  }

  const InputNickName = (name: string) => {
    setNickname(name);
  }

  return (
    <View style={PhoneWrapper.MainContainer}>
      <Header />
      <View style={PhoneWrapper.WarnContainer}>
        <Text style={PhoneWrapper.PhoneTitle}>
          닉네임 확인해주세요 :)
        </Text>
        <Text style={PhoneWrapper.SubPhoneTitle}>
          본인확인을 위해 입력해주세요.
        </Text>
      </View>
      <View style={PhoneWrapper.CodeContainer}>
        <TextInput
          style={PhoneWrapper.authCode}
          // accessible={isCheck}
          keyboardType={"name-phone-pad"}
          onChangeText={value => InputNickName(value)}
          placeholder="닉네임을 입력해주세요.">
        </TextInput>
        {/* <TextInput
          style={PhoneWrapper.authCode}
          // accessible={isCheck}
          keyboardType={"name-phone-pad"}
          value={route.params?.phone}
          placeholder="핸드폰을 입력해주세요.">
        </TextInput> */}
        <TouchableOpacity
          style={PhoneWrapper.ConfirmView}
          onPress={CheckUser}>
          <Text style={PhoneWrapper.ConfirmText}>확인</Text>
        </TouchableOpacity>

      </View>

    </View>
  )
}
const PhoneWrapper = StyleSheet.create({
  MainContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  headerTitle: {
    maxHeight: 100,
    marginTop: 100,
    width: '50%',
  },
  WarnContainer: {
    marginTop: 20,
    // display: 'flex',
    // flex: 1,
    alignItems: 'center',
  },
  PhoneTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    marginTop: 20,
    marginBottom: 20,
  },
  SubPhoneTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: '#B1B1B1'
  },
  CodeContainer: {
    display: 'flex',
    flex: 2,
    paddingTop: 30,
    flexDirection: 'column',
    alignItems: 'center',
  },
  authCode: {
    width: 300,
    height: 60,
    fontSize: 15,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 10,
  },
  ConfirmView: {
    backgroundColor: '#00C1DE',
    marginTop: 25,
    width: 300,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  RegisterContainer: {
    display: 'flex',
    flex: 5,
    alignItems: 'center',
  },
  Register: {
    backgroundColor: '#00C1DE',
    marginTop: 25,
    width: 300,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ConfirmText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  }
})
export default CheckName;