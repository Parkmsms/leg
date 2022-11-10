
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { authphone, existphone, login } from "../../config/AxiosFunction";
import { Device } from "../../models/deviceInfo";
import Header from "../Header";

type SignInVerify = {
  navigation?: any;
  route: any;
}
const SignInVerify = ({ navigation, route }: SignInVerify) => {
  const [authCode, setAuthCode] = useState<string>('');
  const [verfify, setVerify] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [deviceInfo, setDeviceInfo] = useState<Device>({
    deviceToken: '',
  });

  async function Verify(phone: string) {
    console.log("인증페이지에 전달받은 전화번호", phone);
    const response = await authphone(phone);
    console.log("번호 인증후 받은 인증번호", response.data.authCode);
    setAuthCode(response.data.authCode);
  }

  // 전달받은 DeviceToken 설정
  const settingDeviceInfo = useCallback(() => {
    setDeviceInfo({ deviceToken: route.params?.deviceInfo })
  }, []);

  useEffect(() => {
    // 인증번호 받는 함수 실행
    Verify(route.params.phone);
    // DeviceToken 설정 함수 실행
    console.log("휴대폰 인증", route.params?.deviceInfo);

    settingDeviceInfo()
  }, [])

  const ConfirmCode = async () => {
    // 입력한 인증번호와 받은 인증번호 일치하면
    if (verfify === authCode) {
      const response = await existphone(route.params?.phone);
      console.log(response.data);

      //중복된 휴대폰이 없는경우
      if (response.data == false) {
        Alert.alert('회원가입을 먼저 해주세요!')
        // 닉네임 중복체크 페이지로 이동
        navigation.navigate('SignUpAgree', { deviceInfo: deviceInfo });

        //중복된 휴대폰이 있는경우
      } else {

        try {
          console.log(route.params?.phone, route.params?.deviceInfo);

          // 로그인 시도
          const response = await login(route.params?.phone, route.params?.deviceInfo)
          console.log("로그인 성공", response.status);
          console.log("accessToken", response.data.accessToken);
          console.log('refreshToken', response.data.refreshToken);
          if (response.status === 200)
            await AsyncStorage.setItem('accessToken', response.data.accessToken);
          await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
          navigation.navigate('LoginSucess')
        } catch (err) {
          console.log(err);

          // setModalVisible(true)
        }
      }
      // navigation.navigate('SignUpAgree', { phone: input });
      // navigation.navigate('SignUpAgree')
    }

  }
  const InputVerify = (number: string) => {
    setVerify(number);
  }

  const goCheckName = () => {
    navigation.navigate('CheckName', { phone: route.params?.phone })
  }
  return (
    <View style={PhoneWrapper.MainContainer}>
      <Header />
      <View style={PhoneWrapper.WarnContainer}>
        <Text style={PhoneWrapper.PhoneTitle}>
          인증번호를 입력해주세요.
        </Text>
        <Text style={PhoneWrapper.SubPhoneTitle}>
          본인인증을 위해 필요합니다.
        </Text>
      </View>
      <View style={PhoneWrapper.CodeContainer}>
        <TextInput
          style={PhoneWrapper.authCode}
          keyboardType={"number-pad"}
          onChangeText={value => InputVerify(value)}
          placeholder="인증번호 입력해주세요">
        </TextInput>
        <TouchableOpacity
          style={PhoneWrapper.ConfirmView}
          onPress={ConfirmCode}>
          <Text style={PhoneWrapper.ConfirmText}>확인</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        visible={modalVisible}
      >
        <View style={PhoneWrapper.ModalContainer}>
          <Header />
          <Text style={PhoneWrapper.PhoneTitle}>
            이미 등록된 계정입니다.
          </Text>
          {/* <Text style={PhoneWrapper.SubPhoneTitle}>선택해주세요</Text> */}

          <TouchableOpacity
            style={PhoneWrapper.ConfirmView}
            onPress={goCheckName}>
            <Text>제가 이 계정의 주인이에요</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={PhoneWrapper.ConfirmView}
            onPress={() => navigation.navigate('Home')}>
            <Text>제 계정이 아니에요</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  ConfirmText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  ModalContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
})
export default SignInVerify;