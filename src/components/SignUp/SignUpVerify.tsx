import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { authphone, existphone, login } from "../../config/AxiosFunction";
import { Agree } from "../../models/agreeInfo";
import { Device } from "../../models/deviceInfo";
import Header from "../Header";


type SignUpVerify = {
  navigation?: any,
  route: any
}
const SignUpVerify = ({ navigation, route }: SignUpVerify) => {

  const [authCode, setAuthCode] = useState<string>('');
  const [verfify, setVerify] = useState<string>('');
  const [deviceInfo, setDeviceInfo] = useState<Device>({
    deviceToken: '',
  });
  const [userPolicyTerms, setUserPolicTerms] = useState<Agree>({
    agreePolicy1: false,
    agreePolicy2: false,
    agreePolicy3: false
  });

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  async function Verify(phone: string) {
    console.log("인증페이지에 전달받은 전화번호", phone);
    const response = await authphone(phone);
    console.log("번호 인증후 받은 인증번호", response.data.authCode);
    setAuthCode(response.data.authCode);
  }
  // 전달받은 DeviceToken 설정
  const settingDeviceInfo = useCallback(() => {
    setDeviceInfo(route.params?.deviceInfo)
  }, []);

  // 전달받은 동의내용 설정
  const settingUserPolicyInfo = useCallback(() => {
    setUserPolicTerms(route.params?.userPolicyTerms)
  }, []);

  useEffect(() => {
    // 인증번호 받는 함수 실행
    Verify(route.params?.phone);
    // DeviceToken 설정 함수 실행
    settingDeviceInfo()
    // 동의 설정 함수 실행
    settingUserPolicyInfo()

    // 기기토큰 임의변경 테스트 코드
    // setDeviceInfo({
    //   ...deviceInfo,
    //   deviceToken: deviceInfo.deviceToken + '1'
    // })
  }, [])

  useEffect(() => {
    // DeviceToken이 어떤값인지 조사해볼것
    console.log("인증번호 받는 페이지 기기 IMEI:", route.params?.deviceInfo);
    console.log("인증동의 받는 페이지 동의 정보:", userPolicyTerms);

    // console.log("기기 TYPE:", deviceInfo.deviceType);
  }, [deviceInfo])

  const ConfirmCode = async () => {
    // 입력한 인증번호와 받은 인증번호 일치하면
    if (verfify === authCode) {
      const response = await existphone(route.params?.phone);
      console.log(response.data);

      //중복된 휴대폰이 없는경우
      if (response.data == false) {

        // 닉네임 중복체크 페이지로 이동
        navigation.navigate('SignUpName', { phone: route.params?.phone, deviceInfo: deviceInfo, userPolicyTerms: userPolicyTerms })

        //중복된 휴대폰이 있는경우
      } else {

        try {
          // 로그인 시도
          const response = await login(route.params?.phone, deviceInfo.deviceToken)
          console.log(response.data);
          if (response.status === 200)
            await AsyncStorage.setItem('accessToken', response.data.accessToken);
          await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
        } catch {
          setModalVisible(true)
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
    fontSize: 17,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10
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
export default SignUpVerify;