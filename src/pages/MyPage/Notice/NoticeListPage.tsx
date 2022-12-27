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

  const GetData = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await NoticeListAPI(accessToken);
    console.log(response.data.content);
    setData(response.data.content);
  };

  useEffect(() => {
    GetData();
  }, []);

  /* 공지사항 상세 페이지 이동 */
  const goNoticeDetail = (id: number) => {
    navigation.navigate('NoticeDetailPage', {noticeId: id});
  };

  return (
    <>
      <ScrollView style={NoticeListStyle.container}>
        <View style={NoticeListStyle.headerArea}>
          {/* <Text style={NoticeListStyle.header}>공지사항</Text> */}
        </View>
        <View style={NoticeListStyle.listArea}>
          {data.map((item: NoticeListData) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => goNoticeDetail(item.id)}>
              <Text style={NoticeListStyle.listTitle}>{item.title}</Text>
              <Text style={NoticeListStyle.listWrite}>
                {item.createdDate.substring(0, 10)}
              </Text>
              <View style={NoticeListStyle.line}></View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export const NoticeListStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: '#F9FFFF',
  },
  headerArea: {
    flex: 1,
    marginLeft: 15,
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
    fontFamily: 'Apple SD Gothic Neo',
    fontStyle: 'normal',
    fontSize: 17,
  },
  listWrite: {
    fontSize: 12,
  },
  line: {
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E7E7E7',
  },
});

export default NoticeListPage;
