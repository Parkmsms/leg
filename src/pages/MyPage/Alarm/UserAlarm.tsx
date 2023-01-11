import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Button,
  Modal,
  ScrollView,
  Switch,
} from 'react-native';
import {NoticeListAPI, getAccessToken} from '../../../config/AxiosFunction';

/* 공지사항 List Data type */
type NoticeListData = {
  id: number; // 공지사항 ID
  title: string; // 공지사항 제목
  createdDate: string; // 생성일자
  pub: boolean;
};

/* 공지사항 Navigator type */
type NoticeNavigator = {
  navigation?: any;
  route?: any;
};

const NoticeListPage = ({navigation}: NoticeNavigator) => {
  const [data, setData] = useState<NoticeListData[]>([]);
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(false);
  const [isEnabled4, setIsEnabled4] = useState(false);

  const GetData = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await NoticeListAPI(accessToken);
    console.log(response.data.content);
    setData(response.data.content);
  };

  useEffect(() => {
    GetData();
  }, []);

  const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);
  const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
  const toggleSwitch3 = () => setIsEnabled3(previousState => !previousState);
  const toggleSwitch4 = () => setIsEnabled4(previousState => !previousState);

  /* 공지사항 상세 페이지 이동 */
  const goNoticeDetail = (id: number) => {
    navigation.navigate('NoticeDetailPage', {noticeId: id});
  };

  return (
    <>
      <ScrollView style={NoticeListStyle.container}>
        <View style={NoticeListStyle.listArea}>
          <TouchableOpacity>
            <View style={{flexDirection: 'column'}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={NoticeListStyle.listTitle}>포인트 적립</Text>
                <Switch
                  style={{marginLeft: 225, marginTop: 22}}
                  trackColor={{false: '#d2d2d2', true: '#000000'}}
                  thumbColor={isEnabled1 ? '#f4f3f4' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch1}
                  value={isEnabled1}></Switch>
              </View>
              <Text>포인트 적립 및 소멸 예정 포인트 알림 등</Text>
            </View>
            <View style={NoticeListStyle.line}></View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{flexDirection: 'column'}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={NoticeListStyle.listTitle}>찜한 가게</Text>
                <Switch
                  style={{marginLeft: 240, marginTop: 22}}
                  trackColor={{false: '#d2d2d2', true: '#000000'}}
                  thumbColor={isEnabled2 ? '#f4f3f4' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch2}
                  value={isEnabled2}></Switch>
              </View>
              <Text>내가 찜한 가게 이벤트 및 세일 등</Text>
            </View>
            <View style={NoticeListStyle.line}></View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{flexDirection: 'column'}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={NoticeListStyle.listTitle}>동네 알림</Text>
                <Switch
                  style={{marginLeft: 240, marginTop: 22}}
                  trackColor={{false: '#d2d2d2', true: '#000000'}}
                  thumbColor={isEnabled3 ? '#f4f3f4' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch3}
                  value={isEnabled3}></Switch>
              </View>
              <Text>동네 신규 오픈 가게 및 마감 세일 등</Text>
            </View>
            <View style={NoticeListStyle.line}></View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{flexDirection: 'column'}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={NoticeListStyle.listTitle}>
                  이메일 및 문자 마케팅 수신 동의
                </Text>
                <Switch
                  style={{marginLeft: 82, marginTop: 1}}
                  trackColor={{false: '#d2d2d2', true: '#000000'}}
                  thumbColor={isEnabled4 ? '#f4f3f4' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch4}
                  value={isEnabled4}></Switch>
              </View>
            </View>
            <View style={NoticeListStyle.line}></View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export const NoticeListStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#F9FFFF',
  },
  headerArea: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  header: {
    fontFamily: 'Urbanist',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 27,
    marginLeft: 60,
    textShadowRadius: 10,
  },
  listArea: {
    marginLeft: 25,
    marginRight: 20,
    flex: 9,
  },
  listMargin: {
    marginTop: 20,
  },
  listTitle: {
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Apple SD Gothic Neo',
    fontStyle: 'normal',
    fontSize: 17,
    fontWeight: '900',
  },
  listWrite: {
    fontSize: 12,
  },
  line: {
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 0.1,
    borderColor: '#E7E7E7',
  },
});

export default NoticeListPage;
