import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { authphone } from "../../config/AxiosFunction";
import Header from "../Header";

type SignUpPhone = {
  navigation: any;
  route?: any;
}
const SignUpPhone = ({ navigation, route }: SignUpPhone) => {
  const [input, setInput] = useState<string>('');
  const [buttonReady, setButtonReady] = useState<boolean>(false);
  const [phoneValid, setPhoneValid] = useState<boolean>();

  const ButtonChange = (text: string) => {
    setInput(text);

    if (text.length < 11) {
      setButtonReady(false)
      setPhoneValid(undefined);
    } else if (text.length === 11) {
      var regExp2 = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/
      if (regExp2.test(text) === true) {
        setButtonReady(true);
        setPhoneValid(true);
      } else {
        setButtonReady(false);
        setPhoneValid(false);
      }

    }
  }
  useEffect(() => {
    console.log(phoneValid);
  })
  useEffect(() => {
    console.log("핸드폰 Token:", route.params?.deviceInfo);
  }, [])

  const getPhone = async () => {
    navigation.navigate('SignUpVerify', { phone: input, deviceInfo: route.params?.deviceInfo, userPolicyTerms: route.params?.userPolicyTerms })
  }

  return (
    <View style={PhoneWrapper.MainContainer}>
      <Header />
      <View style={PhoneWrapper.WarnContainer}>
        <Text style={PhoneWrapper.PhoneTitle}>
          휴대폰 번호를 입력해주세요.
        </Text>
        <Text style={PhoneWrapper.SubPhoneTitle}>
          본인인증을 위해 필요합니다.
        </Text>
      </View>
      <View style={PhoneWrapper.VerifyContainer}>
        <TextInput style={PhoneWrapper.PhoneNumberInput}
          placeholder=" - 없이 숫자만 입력"
          keyboardType={"number-pad"}
          maxLength={11}
          dataDetectorTypes="phoneNumber"
          onChangeText={value => ButtonChange(value)}
        />
        {phoneValid === undefined ? null : phoneValid === true ?
          <Text style={{ color: '#00C1DE', fontWeight: 'bold', padding: 5 }}>
            사용 가능한 핸드폰 번호입니다.
          </Text> :
          <Text style={{ color: 'red', fontWeight: 'bold', padding: 5 }}>
            다시 입력해주세요.
          </Text>
        }

        <View
          style={{
            backgroundColor: buttonReady === true ? '#00C1DE' : 'lightgray',
            marginTop: 25,
            borderRadius: 8,
            width: 300,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <TouchableOpacity
            style={PhoneWrapper.ButtonView}
            disabled={!buttonReady}
            onPress={getPhone}>
            <Text style={PhoneWrapper.ButtonText}>인증번호 받기</Text>
          </TouchableOpacity>
        </View>
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
  VerifyContainer: {
    display: 'flex',
    flex: 2,
    paddingTop: 30,
    flexDirection: 'column',
  },
  PhoneNumberInput: {
    width: 300,
    height: 60,
    fontSize: 18,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
  },
  ButtonView: {
    padding: 10,
  },
  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  CodeContainer: {
    display: 'flex',
    flex: 1,
    marginLeft: 50,
    flexDirection: 'row'
  },
  authCode: {
    marginTop: 25,
    width: 170,
    height: 50,
    fontSize: 15,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 10,
  },
  ConfirmView: {
    backgroundColor: '#00C1DE',
    marginLeft: 20,
    marginTop: 25,
    borderRadius: 8,
    width: 120,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ConfirmText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  }
})
export default SignUpPhone;