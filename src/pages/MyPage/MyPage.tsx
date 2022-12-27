import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Button,
  Share,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {UserSimpleAPI, getAccessToken} from '../../config/AxiosFunction';
import * as Font from 'expo-font';
import {AccessToken, initialAccessToken} from '../../models/accessToken';
// import AppText from '../components/fontsComponent/fonts';

type UserSimpleData = {
  id: number;
  nickname: string;
  profile: string;
};

const MyPage = ({navigation}: {navigation: any}) => {
  // Font.loadAsync({
  //   Anton: require('../assets/fonts/Anton-Regular.ttf'),
  // });

  // 유저 정보
  const [data, setData] = useState<UserSimpleData>();
  // 프로필 사진 정보
  const [cameraPhoto, setCameraPhoto] = useState<string>();

  const GetData = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await UserSimpleAPI(accessToken);
    console.log(response.data);
    setData(response.data);
  };

  useEffect(() => {
    GetData();
  }, []);

  // 프로필 이미지 변경
  const ProfileImageChange = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchImageLibrary({
        mediaType: 'photo',
      });
      console.log(JSON.stringify(result.assets));
      // setCameraPhoto(result.assets?[0].uri);
    }
  };

  // 프로필 정보 변경
  const ProfileInfoChange = () => {
    navigation.navigate('ProfileChange');
  };

  // 앱 공유하기
  const onShare = () => {
    Share.share({
      message: 'leg.werow.co.kr',
    });
  };

  // 포인트 이력
  const PointHistory = () => {
    navigation.navigate('PointHistory');
  };
  return (
    <>
      <SafeAreaView style={MyPageStyle.container}>
        <View style={MyPageStyle.borderBox}>
          <View style={MyPageStyle.borderBoxInner}>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 6,
                left: 110,
                top: 20,
                padding: 1,
                backgroundColor: '#c8c8c8',
                zIndex: 1,
              }}>
              <Icon name="camera" size={20} color="black" />
            </View>
            <TouchableOpacity onPress={() => ProfileImageChange()}>
              {data?.profile != null ? (
                <Image
                  source={{uri: data?.profile}}
                  style={MyPageStyle.profileImage}
                />
              ) : (
                <Image
                  source={require('../../assets/ProfileImage2.jpg')}
                  style={MyPageStyle.profileImage}
                />
              )}
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => ProfileInfoChange()}>
                <Text style={MyPageStyle.profileInfo}>{data?.nickname}</Text>
                <Text>포인트 : 1,340</Text>
              </TouchableOpacity>
              <View>
                <TouchableOpacity onPress={() => PointHistory()}>
                  <Text style={MyPageStyle.point}>적립내역</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={MyPageStyle.mypageBox}>
          <View style={MyPageStyle.mypageRow}>
            <View style={MyPageStyle.mypageListRow}>
              <Icon name="megaphone-outline" size={20} color="black" />
              <TouchableOpacity
                onPress={() => navigation.navigate('NoticeListPage')}>
                <Text style={MyPageStyle.mypageFont}>공지사항</Text>
              </TouchableOpacity>
            </View>

            <View style={MyPageStyle.mypageListRow}>
              <Icon name="flash-outline" size={20} color="black" />
              <TouchableOpacity
                onPress={() => navigation.navigate('EventList')}>
                <Text style={MyPageStyle.mypageFont}>이벤트</Text>
              </TouchableOpacity>
            </View>

            <View style={MyPageStyle.mypageListRow}>
              <Icon name="bookmark-outline" size={20} color="black" />
              <TouchableOpacity
                onPress={() => navigation.navigate('UserPicksPage')}>
                <Text style={MyPageStyle.mypageFont}>찜한가게</Text>
              </TouchableOpacity>
            </View>

            <View style={MyPageStyle.mypageListRow}>
              <Icon name="search-outline" size={20} color="black" />
              <TouchableOpacity onPress={() => navigation.navigate('Inquire')}>
                <Text style={MyPageStyle.mypageFont}>문의하기</Text>
              </TouchableOpacity>
            </View>

            <View style={MyPageStyle.mypageListRow}>
              <Icon name="share-social-outline" size={20} color="black" />
              <TouchableOpacity onPress={() => onShare()}>
                <Text style={MyPageStyle.mypageFont}>앱 공유하기</Text>
              </TouchableOpacity>
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
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#00C1DE',
    justifyContent: 'flex-start',
    flexDirection: 'row',
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
    marginLeft: 30,
    marginRight: 40,
    borderColor: '#00C1DE',
    borderWidth: 1,
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
    marginTop: 23,
    marginLeft: 30,
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
    marginLeft: 30,
    borderWidth: 1,
    borderRadius: 60,
  },
});

export default MyPage;
