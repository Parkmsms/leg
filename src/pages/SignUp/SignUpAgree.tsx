import CheckBox from "@react-native-community/checkbox";
import { RoundedCheckbox, PureRoundedCheckbox } from "react-native-rounded-checkbox";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Agree } from "../../models/agreeInfo";
import Header from "../../components/Header/HeaderImage";
import Icon from "react-native-vector-icons/Entypo";

type SignUpAgree = {
  navigation: any;
  route?: any;
}

const SignUpAgree = ({ navigation, route }: SignUpAgree) => {
  const [checkList, setCheckList] = useState<string[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  // const [infoCheckBox, setInfoCheckBox] = useState(false);
  // const [eventCheckBox, setEventCheckBox] = useState(false);
  const [userPolicyTerms, setUserPolicyTerms] = useState<Agree>({
    agreePolicy1: false,
    agreePolicy2: false,
    agreePolicy3: false
  });

  // const checkAll = (e: ChangeEvent<HTMLInputElement>) => {
  //   // e.target.lib ? setCheckList([isAllChecked, infoCheckBox, eventCheckBox]) : setCheckList([]);
  // }

  const setInfoCheckBox = (checked: any) => {
    console.log("info check", checked);
    setUserPolicyTerms({ ...userPolicyTerms, agreePolicy1: checked })
    // e.target
    //   ? setCheckList([...checkList, e.target.nativeID]) : setCheckList(checkList.filter((choice) => choice !== e.target));
  }

  const setEventCheckBox = (checked: any) => {
    console.log("event check", checked);
    if (checked) {
      setUserPolicyTerms({ ...userPolicyTerms, agreePolicy2: checked })
    } else {
      setUserPolicyTerms({ ...userPolicyTerms, agreePolicy2: checked })
      setUserPolicyTerms({
        agreePolicy1: false,
        agreePolicy2: false,
        agreePolicy3: false
      })
      setIsAllChecked(false);
    }
  }

  const setLocationCheckBox = (checked: any) => {
    console.log("location check", checked);

    if (checked) {
      setUserPolicyTerms({ ...userPolicyTerms, agreePolicy3: checked })
    } else {
      setUserPolicyTerms({ ...userPolicyTerms, agreePolicy3: !checked })
      setUserPolicyTerms({
        agreePolicy1: false,
        agreePolicy2: false,
        agreePolicy3: false
      })
      setIsAllChecked(false);
    }
  }


  const settingUserPolicyInfo = useCallback(() => {
    // try {
    //   deviceInfo.deviceToken = DeviceInfo.getDeviceId()
    // } catch (e) {
    //   console.log(
    //     'Unable to get device token.Either simulator or not iOS11 + ',
    //   );
    // }
    setUserPolicyTerms({
      agreePolicy1: true,
      agreePolicy2: true,
      agreePolicy3: true
    })
  }, []);

  useEffect(() => {
    console.log("동의 Token:", route.params?.deviceInfo);
    console.log("동의 항목", userPolicyTerms);

  }, [userPolicyTerms])

  const goSignUpPhone = () => {
    navigation.navigate('SignUpPhone', { deviceInfo: route.params?.deviceInfo, userPolicyTerms: userPolicyTerms })
  }

  const allAgreeHnalder = (checked: any) => {
    // setIsAllChecked(!isAllChecked)
    // e.target ?
    //   setCheckList(['event', 'location']) : setCheckList([]);
    console.log(checked);

    if (checked) {
      settingUserPolicyInfo()
      setIsAllChecked(true);
    } else if (!checked) {
      setUserPolicyTerms({
        agreePolicy1: false,
        agreePolicy2: false,
        agreePolicy3: false
      })
      setIsAllChecked(false);
    }
  }
  const setAgreeHandler = (key: string, e: ChangeEvent<HTMLInputElement>) => {
    console.log(key);
    // console.log(e.target.lib);



  }
  return (
    <View style={AgreeWrapper.MainContainer}>
      <Header />
      <View style={AgreeWrapper.AgreeContainter}>
        <Text style={AgreeWrapper.AgreeTitle}>
          이용 약관에 동의해주세요.
        </Text>
        <View style={AgreeWrapper.AgreeBox}>
          <CheckBox
            nativeID="all"
            style={AgreeWrapper.checkBox}
            onCheckColor="#00C1DE"
            disabled={false}
            onValueChange={allAgreeHnalder}
            value={isAllChecked}
          // onChange={allAgreeHnalder} 
          />
          {/* <RoundedCheckbox
            // outerStyle={{ borderWidth: 100 }}
            innerStyle={AgreeWrapper.checkBox}
            // active={isAllChecked}
            onPress={allAgreeHnalder}
            isChecked={isAllChecked}
            checkedColor={'#00C1DE'}
            uncheckedColor={'#00C1DE'}
          // onChange={allAgreeHnalder} 
          >
            <Icon
              size={16}
              name="check"
              color={isAllChecked ? "#fdfdfd" : "transparent"}
            />
          </RoundedCheckbox> */}
          <Text style={AgreeWrapper.checkText}> 전체 동의</Text>
        </View>
        <View style={AgreeWrapper.AgreeBox}>
          <CheckBox
            nativeID="info"
            style={AgreeWrapper.checkBox}
            onCheckColor="#00C1DE"
            disabled={false}
            onValueChange={(e: any) => setInfoCheckBox(e)}
            value={userPolicyTerms.agreePolicy1}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAgreeHandler('info', e)}
          />
          {/* <RoundedCheckbox
            innerStyle={AgreeWrapper.checkBox}
            // active={false}
            onPress={(e: any) => setInfoCheckBox(e)}
            isChecked={userPolicyTerms.agreePolicy1}
            checkedColor={'#00C1DE'}
            uncheckedColor={'#00C1DE'}
          >
            <Icon
              size={16}
              name="check"
              color={userPolicyTerms.agreePolicy1 ? "#fdfdfd" : "transparent"}
            />
          </RoundedCheckbox> */}
          <Text style={AgreeWrapper.checkText}> [필수] 개인정보 수집 및 이용 동의</Text>
        </View>
        <View style={AgreeWrapper.AgreeBox}>
          <CheckBox
            nativeID="event"
            onCheckColor="#00C1DE"
            style={AgreeWrapper.checkBox}
            disabled={false}
            onValueChange={(e: any) => setEventCheckBox(e)}
            value={userPolicyTerms.agreePolicy2}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAgreeHandler('event', e)}
          />
          {/* <RoundedCheckbox
            innerStyle={AgreeWrapper.checkBox}
            // active={false}
            onPress={(e: any) => setEventCheckBox(e)}
            isChecked={userPolicyTerms.agreePolicy2}
            checkedColor={'#00C1DE'}
            uncheckedColor={'#00C1DE'}
          ><Icon
              size={16}
              name="check"
              color={userPolicyTerms.agreePolicy2 ? "#fdfdfd" : "transparent"}
            />
          </RoundedCheckbox> */}
          <Text style={AgreeWrapper.checkText}> [선택] 이벤트 정보 수신 동의</Text>

        </View>
        <View style={AgreeWrapper.AgreeBox}>
          <CheckBox
            style={AgreeWrapper.checkBox}
            onCheckColor="#00C1DE"
            disabled={false}
            onValueChange={(e: any) => setLocationCheckBox(e)}
            value={userPolicyTerms.agreePolicy3}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAgreeHandler('location', e)}
          />
          {/* <RoundedCheckbox
            innerStyle={AgreeWrapper.checkBox}
            // active={false}
            onPress={(e: any) => setLocationCheckBox(e)}
            isChecked={userPolicyTerms.agreePolicy3}
            checkedColor={'#00C1DE'}
            uncheckedColor={'#00C1DE'}
          ><Icon
              size={16}
              name="check"
              color={userPolicyTerms.agreePolicy3 ? "#fdfdfd" : "transparent"}
            />
          </RoundedCheckbox> */}
          <Text style={AgreeWrapper.checkText}> [선택] 위치 정보 수신 동의</Text>
        </View>
        <TouchableOpacity style={AgreeWrapper.button}>
          <Text style={AgreeWrapper.verify} onPress={goSignUpPhone}>인증하기</Text>
        </TouchableOpacity>
      </View>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={AgreeWrapper.phoneBox}>
          <Text style={AgreeWrapper.phone}>휴대폰 번호</Text>
          <TextInput
            value={route.params?.phone}
            keyboardType={'default'}
            onKeyPress={Keyboard.dismiss}
            placeholder="휴대전화 인증후 자동기입됩니다" style={AgreeWrapper.PhoneNumberInput}></TextInput>
        </View>
      </TouchableWithoutFeedback> */}
    </View >

  )
}
const AgreeWrapper = StyleSheet.create({
  MainContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  headerTitle: {
    marginTop: 100,
    width: '50%',
  },
  AgreeContainter: {
    marginTop: 20,
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
  AgreeTitle: {
    fontWeight: '700',
    color: 'black',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20
  },
  AgreeBox: {
    width: 300,
    height: 50,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRadius: 10,
    borderColor: 'lightgray',
    display: "flex",
    flexDirection: "row",
    alignItems: 'center'
  },
  checkBox: {
    margin: 1,
  },
  checkText: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black'
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: '#00C1DE',
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  verify: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  phoneBox: {
    marginTop: 100,
    marginLeft: 30,
    flex: 2,
  },
  phone: {
    color: 'black'
  },
  PhoneNumberInput: {
    width: 280,
    height: 50,
    fontSize: 20,
    borderColor: 'lightgray',
    borderBottomWidth: 1,
    borderRadius: 10,
  },
})
export default SignUpAgree;