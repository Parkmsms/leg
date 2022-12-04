import React, { useCallback, useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { authphone, checkname, existphone, login, register } from "../../config/AxiosFunction";
import DeviceInfo from 'react-native-device-info';
import { Device, initialDevice } from "../../models/deviceInfo";
import Header from "../../components/Header/HeaderImage";
import { Agree, initialAgree } from "../../models/agreeInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomPopup from "../../components/Modal/BottomPopUp";

type SignUpName = {
  navigation?: any,
  route: any
}

const SignUpName = ({ navigation, route }: SignUpName) => {
  const [phone, setPhone] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [nameCheck, setNameCheck] = useState<boolean>();
  const [nameValid, setNameValid] = useState<boolean>();
  const [modalOpen, setModalOpen] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<Device>(initialDevice);
  const [userPolicyTerms, setUserPolicTerms] = useState<Agree>(initialAgree);

  useEffect(() => {
    console.log("닉네임 설정 페이지 전달받은 폰번호:", route.params?.phone);
    console.log("닉네임 설정 페이지 기기 IMEI:", route.params?.deviceInfo);
    console.log("닉네임 설정 페이지 동의 정보:", route.params?.userPolicyTerms);

    setPhone(route.params?.phone);
    setDeviceInfo({ deviceToken: route.params?.deviceInfo });
    setUserPolicTerms(route.params?.userPolicyTerms)
  }, [])

  //회원가입
  const Register = async () => {
    console.log("phone ", phone);
    console.log("nickname", nickname);
    console.log("deviceInfo ", deviceInfo.deviceToken);
    console.log("AgreeInfo", userPolicyTerms);

    const response = await register(phone, nickname, deviceInfo.deviceToken, userPolicyTerms);
    // console.log(response.data);
    if (response.status === 200) {
      // 로그인 시도 
      const response = await login(phone, deviceInfo.deviceToken)
      try {
        console.log("로그인 성공", response.status);
        console.log("accessToken", response.data.accessToken);
        console.log('refreshToken', response.data.refreshToken);
        await AsyncStorage.setItem('accessToken', response.data.accessToken);
        await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
        navigation.navigate('LocationSearch', { registSucess: true })
      } catch (err) {
        console.log(err);
      }
    } else {
      Alert.alert('회원가입 실패했습니다!');
    }

  }

  const openModal = () => {
    setModalOpen(true);
  }

  useEffect(() => {
    console.log("nameValid", nameValid);
    console.log("nameCheck", nameCheck);

  })
  const closeModal = () => {
    setModalOpen(false);
  }

  // 닉네임 중복 체크
  const CheckNickName = async () => {
    const response = await checkname(nickname);
    console.log("닉네임 중복확인 결과: ", response.data);
    if (response.data == true) {
      setNameCheck(false);
    } else {
      setNameCheck(true)
      openModal();
    }
  }
  const InputNickName = (name: string) => {
    setNickname(name);
    var check_num = /[0-9]/;    // 숫자 
    var check_eng = /[a-zA-Z]/;    // 문자 
    var check_spc = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
    var check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크
    if (name.length < 1) {
      setNameValid(undefined)
    } else if (name.length <= 1) {
      setNameValid(false);
    } else if (name.length > 1) {
      if (check_kor.test(name) && check_eng.test(name) && check_num.test(name) || !check_spc.test(name)) {
        setNameValid(true);
      } else {
        setNameValid(false);
      }
    }
  }

  return (
    <View style={PhoneWrapper.MainContainer}>
      <Header />
      <View style={PhoneWrapper.WarnContainer}>
        <Text style={PhoneWrapper.PhoneTitle}>
          닉네임을 설정해주세요 :)
        </Text>
        <Text style={PhoneWrapper.SubPhoneTitle}>
          (2~10자리 한글,영어,숫자 특수문자제외)
        </Text>
      </View>

      <View style={PhoneWrapper.CodeContainer}>
        <View style={PhoneWrapper.NameContainer}>
          <TextInput
            style={{
              width: 165,
              height: 50,
              fontSize: 15,
              borderColor: nameValid === undefined && true ? 'lightgray' : 'red',
              borderWidth: 1,
              borderRadius: 10,
            }}
            maxLength={10}
            // accessible={isCheck}
            keyboardType={"name-phone-pad"}
            onChangeText={value => InputNickName(value)}
            placeholder="닉네임을 입력해주세요.">
          </TextInput>
          <View>
            {/* {nameValid == undefined && nameCheck === undefined ?
              <Text style={{ color: 'black', fontWeight: 'bold' }}> 입력해주세요. </Text>
              : nameValid === true && nameCheck === undefined ?
                <Text style={{ color: '#00C1DE', fontWeight: 'bold' }}> 사용 가능한 닉네임입니다.</Text>
                : nameValid === false && nameCheck === undefined ?
                  <Text style={{ color: 'red', fontWeight: 'bold' }}> 형식에 맞지 않는 닉네임입니다.</Text>
                  : nameValid === true && nameCheck == undefined ?
                    null
                    : nameValid === true && nameCheck === true ?
                      <Text style={{ color: '#00C1DE', fontWeight: 'bold' }}> 등록 가능한 닉네임입니다. </Text>
                      : nameValid === true && nameCheck === false ?
                        <Text style={{ color: 'red', fontWeight: 'bold' }}> 중복된 닉네임입니다. </Text>
                        : null
            } */}
          </View>

        </View>
        <TouchableOpacity
          style={PhoneWrapper.ConfirmView}
          onPress={CheckNickName}>
          <Text style={PhoneWrapper.ConfirmText}>중복확인</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={{
        display: 'flex',
        // flex: 1,
        marginLeft: 50,
        // marginTop: 30,
        // justifyContent: 'flex-start',
        // alignItems: 'flex-start',
        // alignContent: 'flex-start',
        alignSelf: 'flex-start'
      }}>

      </View> */}

      <View style={PhoneWrapper.RegisterContainer}>
        <TouchableOpacity style={PhoneWrapper.Register}
          onPress={Register}>
          <Text style={PhoneWrapper.ConfirmText}>회원가입</Text>
        </TouchableOpacity>
      </View>

      <BottomPopup
        open={modalOpen}
        close={closeModal}
        header={"등록 가능합니다!"}
        onTouchOutSide={closeModal}
      />
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
    flex: 1,
    marginTop: 50,
    marginBottom: 10,
    flexDirection: 'row',
  },
  NameContainer: {
    width: 200,
    flexDirection: 'column',
  },
  authCode: {
    width: 165,
    height: 50,
    fontSize: 15,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 10,
  },
  ConfirmView: {
    backgroundColor: '#00C1DE',
    borderRadius: 8,
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  RegisterContainer: {
    display: 'flex',
    flex: 5,
    alignItems: 'center',
    marginTop: 50,
  },
  Register: {
    backgroundColor: '#00C1DE',
    // marginTop: 25,
    width: 300,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ConfirmText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  }
})
export default SignUpName;