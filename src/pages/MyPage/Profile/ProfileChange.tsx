import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Share,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {getAccessToken, UserProfileAPI} from '../../../config/AxiosFunction';
import {UserProfileData, initialUserProfile} from '../../../models/userProfile';

const ProfileChange = ({navigation}: {navigation: any}) => {
  const [data, setData] = useState<UserProfileData>(initialUserProfile);

  const GetData = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await UserProfileAPI(accessToken);
    console.log(response.data);
    setData(response.data);
  };

  useEffect(() => {
    GetData();
  }, []);

  // 닉네임 변경
  const NicknameChange = () => {
    navigation.navigate('NicknameChange');
  };

  // 이메일 변경
  const EmailChange = () => {
    navigation.navigate('EmailChange');
  };

  return (
    <>
      <SafeAreaView style={MyPageStyle.container}>
        <View style={MyPageStyle.borderBox}>
          <Text
            style={{
              marginTop: 10,
              marginLeft: 10,
              fontSize: 22,
              fontWeight: 'bold',
              color: '#000000',
              // fontFamily: 'Anton',
            }}>
            기본 정보
          </Text>
          <View
            style={{marginTop: 10, marginLeft: 10, flexDirection: 'column'}}>
            <Text style={{fontSize: 15, marginBottom: 10, marginTop: 10}}>
              닉네임
            </Text>
            <TouchableOpacity onPress={() => NicknameChange()}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                  {data.nickname}
                </Text>
                <Icon
                  name="pencil"
                  size={20}
                  color="black"
                  style={{left: 300, top: 3}}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#E7E7E7',
                marginTop: 5,
              }}></View>
          </View>
          <View
            style={{marginTop: 20, marginLeft: 10, flexDirection: 'column'}}>
            <Text style={{fontSize: 15, marginBottom: 10}}>휴대폰 번호</Text>
            <Text style={{fontSize: 17, fontWeight: 'bold'}}>
              {data.phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#E7E7E7',
                marginTop: 5,
              }}></View>
          </View>
        </View>
        <View
          style={{
            marginTop: 100,
            borderWidth: 6,
            borderColor: '#E7E7E7',
          }}></View>
        <View style={MyPageStyle.mypageBox}>
          <View style={MyPageStyle.mypageRow}>
            <Text
              style={{
                marginTop: 12,
                marginLeft: 20,
                fontSize: 22,
                fontWeight: 'bold',
                color: '#000000',
                // fontFamily: 'Anton',
              }}>
              부가 정보 (선택사항)
            </Text>
            <View
              style={{marginTop: 20, marginLeft: 16, flexDirection: 'column'}}>
              <View
                style={{
                  marginTop: 1,
                  marginLeft: 10,
                  flexDirection: 'column',
                }}>
                <Text style={{fontSize: 15, marginBottom: 10}}>이메일</Text>
                <TouchableOpacity onPress={() => EmailChange()}>
                  <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                    {data.email}
                  </Text>
                  <Icon
                    name="pencil"
                    size={20}
                    color="black"
                    style={{left: 340, bottom: 20}}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#E7E7E7',
                  bottom: 13,
                  marginRight: 15,
                }}></View>
            </View>
            <View
              style={{marginTop: 12, marginLeft: 16, flexDirection: 'column'}}>
              <View
                style={{
                  marginTop: 1,
                  marginLeft: 10,
                  flexDirection: 'column',
                }}>
                <Text style={{fontSize: 15, marginBottom: 10}}>생년월일</Text>
                <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                  1994.04.19
                </Text>
                <Icon
                  name="pencil"
                  size={20}
                  color="black"
                  style={{left: 340, bottom: 20}}
                />
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#E7E7E7',
                  bottom: 13,
                  marginRight: 15,
                }}></View>
            </View>
            <View
              style={{marginTop: 12, marginLeft: 16, flexDirection: 'column'}}>
              <View
                style={{
                  marginTop: 1,
                  marginLeft: 10,
                  flexDirection: 'column',
                }}>
                <Text style={{fontSize: 15, marginBottom: 10}}>동네</Text>
                <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                  서울특별시 증산동
                </Text>
                <Icon
                  name="pencil"
                  size={20}
                  color="black"
                  style={{left: 340, bottom: 20}}
                />
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#E7E7E7',
                  bottom: 13,
                  marginRight: 15,
                }}></View>
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
