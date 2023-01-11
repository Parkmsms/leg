import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Button,
  ScrollView,
  TextInput,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  UserNicknameChangeAPI,
  getAccessToken,
  UserProfileAPI,
} from '../../../config/AxiosFunction';
import {UserProfileData, initialUserProfile} from '../../../models/userProfile';

const NoticeListPage = () => {
  const [data, setData] = useState<UserProfileData>(initialUserProfile);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const GetData = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await UserProfileAPI(accessToken);
    console.log(response.data);
    setData(response.data);
  };

  const ProfileChangeProp = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await UserNicknameChangeAPI(accessToken, data.nickname);
    console.log(response.data);
    setData(response.data);
  };

  useEffect(() => {
    GetData();
    ProfileChangeProp();
  }, []);
  return (
    <>
      <View style={ProfileChangeStyle.container}>
        <View style={{left: 30, top: 30}}>
          <Text>Chan</Text>
        </View>
        {data.profile != null ? (
          <Image
            source={{uri: data.profile}}
            style={ProfileChangeStyle.profileImage}
          />
        ) : (
          <Image
            source={require('../../../assets/ProfileImage2.jpg')}
            style={ProfileChangeStyle.profileImage}
          />
        )}
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            width: 25,
            height: 25,
            padding: 4,
            left: 340,
            bottom: 40,
            backgroundColor: '#E1F6FA',
            zIndex: 1,
          }}>
          <Icon name="camera" size={15} color="black" />
        </View>
        <View>
          <Text></Text>
        </View>
        <View style={ProfileChangeStyle.borderBox}>
          <Text style={ProfileChangeStyle.nickName}>닉네임</Text>
          <TextInput style={ProfileChangeStyle.textInput}>
            {data.nickname}
          </TextInput>
          <Text style={ProfileChangeStyle.nickName}>연락처</Text>
          <TextInput style={ProfileChangeStyle.textInput}>
            {data.phone}
          </TextInput>
          <Text style={ProfileChangeStyle.nickName}>이메일</Text>
          <TextInput style={ProfileChangeStyle.textInput}>
            {data.email}
          </TextInput>
          <View style={{flexDirection: 'row'}}>
            <Text style={ProfileChangeStyle.pushToggle}>푸시 알림</Text>
            <Switch
              style={{marginLeft: 130, marginTop: 22}}
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}></Switch>
          </View>
        </View>
      </View>
    </>
  );
};

export const ProfileChangeStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: '#F9FFFF',
  },
  borderBox: {
    flex: 1,
    marginTop: 40,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#00C1DE',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  profileImage: {
    left: 300,
    bottom: 15,
    borderColor: '#00C1DE',
    borderWidth: 1,
    borderRadius: 70,
    width: 65,
    height: 65,
  },
  nickName: {
    marginLeft: 20,
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 20,
    fontStyle: 'normal',
  },
  textInput: {
    width: 300,
    height: 50,
    marginLeft: 25,
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 7,
    borderColor: '#00C1DE',
    // backgroundColor: '#969696',
  },
  pushToggle: {
    marginLeft: 20,
    marginRight: 50,
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 20,
    fontStyle: 'normal',
    // alignContent: 'flex-end',
  },
});

export default NoticeListPage;
