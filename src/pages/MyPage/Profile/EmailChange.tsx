import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Share,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {getAccessToken, UserProfileAPI} from '../../../config/AxiosFunction';
import {UserProfileData, initialUserProfile} from '../../../models/userProfile';

const ProfileChange = ({navigation}: {navigation: any}) => {
  const [data, setData] = useState<UserProfileData>(initialUserProfile);
  const [errorMessage, setErrorMessage] = useState<String>('');
  const [disabled, setDisabled] = useState(false);

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
    setErrorMessage(InputEmail(email) ? '' : '이메일 형식이 아닙니다.');
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
              이메일
            </Text> */}
            <View style={{flexDirection: 'row'}}>
              <TextInput
                onChangeText={value => _handleEmailChange(value)}
                placeholder="이메일 형식에 맞춰 입력해주세요."
                style={{fontSize: 17, fontWeight: 'bold'}}></TextInput>
              <View>
                <Text></Text>
              </View>
              <Icon
                name="close"
                size={20}
                color="black"
                style={{left: 5, top: 12}}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: '#00C1DE',
                  borderRadius: 8,
                  width: 70,
                  height: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                  left: 30,
                  top: 10,
                }}
                onPress={CheckEmail}
                disabled={disabled}>
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
                marginRight: 100,
              }}></View>
            <View>
              <Text style={{color: '#FF0000', opacity: 0.4}}>
                {errorMessage}
              </Text>
            </View>
          </View>
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

export default ProfileChange;
