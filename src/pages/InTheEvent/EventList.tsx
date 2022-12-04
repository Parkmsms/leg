import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from 'react-native';
import { EventListAPI, getAccessToken } from '../../config/AxiosFunction';
// import {EventDetailAPI} from '../../config/AxiosFunction';

/* 이벤트 리스트 Data */
type EventListData = {
  id: number; // 공지사항 ID
  title: string; // 공지사항 제목
  banner: string; // 이벤트 메인 배너
  pub: boolean;
  start: string; // 이벤트 시작 일자
  end: string; //  이벤트 종료 일자
};

/* 이벤트 Navigator */
type NoticeNavigator = {
  navigation?: any;
  route?: any;
};

const EventListPage = (
  { navigation, route }: { navigation: any; route: any },
  prop: any,
) => {
  const [data, setData] = useState<EventListData[]>([]);

  const GetData = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await EventListAPI(accessToken);
    setData(response.data.content);
  };

  const goEventDetailPage = (id: number) => {
    console.log('상세페이지 클릭');
    console.log(id);
    // EventDetailAPI();
  };

  useEffect(() => {
    // console.log('route.params', route.params.id);
    GetData();
  }, []);

  /* 공지사항 상세 페이지 이동 */
  const goEventDetail = (id: number) => {
    console.log('1');
    navigation.navigate('EventDetailPage');
  };

  return (
    <>
      <SafeAreaView style={NoticeListStyle.container}>
        <View style={NoticeListStyle.headerArea}>
          {/* <Text style={NoticeListStyle.header}>공지사항</Text> */}
        </View>
        <View style={NoticeListStyle.listArea}>
          {data.map((item: EventListData) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                prop.navigation.navigate(
                  'EventDetail',
                  goEventDetailPage(item.id),
                )
              }>
              <Text style={NoticeListStyle.listTitle}>{item.title}</Text>
              <Image
                style={{ width: 100, height: 100 }}
                source={{
                  uri: item.banner,
                }}></Image>

              <View style={NoticeListStyle.line}></View>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </>
  );
};

export const NoticeListStyle = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 12,
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
    fontSize: 19,
  },
  listWrite: {
    fontSize: 14,
  },
  line: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#E7E7E7',
  },
});

export default EventListPage;
