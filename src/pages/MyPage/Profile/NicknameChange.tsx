import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  checknameChange,
  getAccessToken,
  UserProfileAPI,
} from '../../../config/AxiosFunction';
import {UserProfileData, initialUserProfile} from '../../../models/userProfile';
import BottomPopup from '../../../components/Modal/BottomPopUp';

type SignUpName = {
  navigation?: any;
  route: any;
};

const SignUpName = ({navigation, route}: SignUpName) => {
  const [nickname, setNickname] = useState<string>('');
  const [nameCheck, setNameCheck] = useState<boolean>();
  const [nameValid, setNameValid] = useState<boolean>();
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState<UserProfileData>(initialUserProfile);
  const [errorMessage, setErrorMessage] = useState<String>('');
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    console.log('nameValid', nameValid);
    console.log('nameCheck', nameCheck);
  }, []);

  const openModal = () => {
    setModalOpen(true);
    console.log('모달오픈', modalOpen);
    console.log('닉넴체크', nameCheck);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // 닉네임 중복 체크
  const CheckNickName = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await checknameChange(nickname, accessToken);
    console.log('닉네임 중복확인 결과: ', response.data);
    if (response.data == true) {
      setNameCheck(false);
    } else {
      setNameCheck(true);
      openModal();
    }
  };
  const InputNickName = (name: string) => {
    setNickname(name);
    var check_num = /[0-9]/; // 숫자
    var check_eng = /[a-zA-Z]/; // 문자
    var check_spc = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
    var check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크
    if (name.length < 1) {
      setNameValid(undefined);
    } else if (name.length <= 1) {
      setNameValid(false);
    } else if (name.length > 1) {
      if (
        (check_kor.test(name) &&
          check_eng.test(name) &&
          check_num.test(name)) ||
        !check_spc.test(name)
      ) {
        setNameValid(true);
      } else {
        setNameValid(false);
      }
    }
  };
  const GetData = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await UserProfileAPI(accessToken);
    console.log(response.data);
    setData(response.data);
  };

  useEffect(() => {
    GetData();
    setDisabled(!!errorMessage);
    console.log('이펙트 에러메시지', errorMessage);
  }, [errorMessage]);

  // 이메일 중복체크
  const CheckEmail = () => {
    navigation.navigate('EmailChange');
  };

  // 이메일 형식 체크
  const _handleEmailChange = (email: string) => {
    setErrorMessage(InputEmail(email) ? '' : 'Please verify your email');
    console.log('함수 이메일', email);
  };
  const InputEmail = (email: string) => {
    const regex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return regex.test(email);
  };

  return (
    <>
      <SafeAreaView style={MyPageStyle.container}>
        <View style={MyPageStyle.borderBox}>
          <View
            style={{marginTop: 10, marginLeft: 10, flexDirection: 'column'}}>
            {/* <Text style={{fontSize: 15, marginBottom: 10, marginTop: 10}}>
              닉네임
            </Text> */}
            <View style={{flexDirection: 'row'}}>
              <TextInput
                onChangeText={value => InputNickName(value)}
                placeholder="최대 10자 (한글, 숫자, 영문)"
                maxLength={10}
                keyboardType={'name-phone-pad'}
                style={{fontSize: 17, fontWeight: 'bold'}}></TextInput>
              <View>
                <Text></Text>
              </View>
              <Icon
                name="close"
                size={20}
                color="black"
                style={{left: 45, top: 15}}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: '#00C1DE',
                  borderRadius: 8,
                  width: 70,
                  height: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                  left: 70,
                  top: 10,
                }}
                onPress={CheckNickName}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
                  중복확인
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#E7E7E7',
                bottom: 5,
                marginRight: 90,
              }}></View>
          </View>
        </View>
        <BottomPopup
          open={modalOpen}
          close={closeModal}
          header={'등록 가능합니다!'}
          onTouchOutSide={closeModal}
        />
        <View style={{bottom: 0}}>
          <Text>asd</Text>
        </View>
      </SafeAreaView>
    </>
  );
};
export const MyPageStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FFFF',
  },
  borderBox: {
    flex: 1,
    marginTop: 55,
    marginLeft: 15,
    marginRight: 20,
    // borderWidth: 2,
    // borderRadius: 15,
    borderColor: '#00C1DE',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    // backgroundColor: '#00C1DE',
  },
  borderBoxInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    fontWeight: 'bold',
    fontSize: 20,
    fontStyle: 'normal',
  },
  profileImage: {
    marginLeft: 5,
    marginRight: 30,
    borderColor: '#00C1DE',
    borderWidth: 2,
    borderRadius: 70,
    width: 80,
    height: 80,
  },
  mypageBox: {
    flex: 3,
  },
  mypageRow: {
    flexDirection: 'column',
  },
  mypageListRow: {
    marginTop: 25,
    marginLeft: 40,
    flexDirection: 'row',
  },
  mypageFont: {
    marginLeft: 10,
    fontSize: 19,
    fontWeight: 'bold',
    fontFamily: 'Anton',
  },
  point: {
    padding: 5,
    marginTop: 22,
    marginLeft: 20,
    borderWidth: 1,
    borderRadius: 60,
  },
});
export default SignUpName;
