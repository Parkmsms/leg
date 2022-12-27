import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {EventDetailAPI, getAccessToken} from '../../../config/AxiosFunction';

/* 이벤트 리스트 Data */
type EventDetail = {
  id: number; // 공지사항 ID
  title: string; // 공지사항 제목
  banner: string; // 이벤트 메인 배너
  pub: boolean;
  start: string; // 이벤트 시작 일자
  end: string; //  이벤트 종료 일자
  images: string[];
};

type NoticeNavigator = {
  navigation?: any;
  route?: any;
};

const EventDetailPage = ({navigation, route}: NoticeNavigator) => {
  const [data, setData] = useState<EventDetail>();

  const GetData = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await EventDetailAPI(accessToken, route.params?.eventId);
    console.log(response.data.images[0]);
    console.log(response.data.id);
    setData(response.data);
  };

  useEffect(() => {
    setTimeout(() => {
      GetData();
    }, 1000);
  }, []);

  return (
    <>
      <ScrollView style={EventDetailStyle.container}>
        <View>
          {data?.images.map((item: string, index: number) => (
            <Image
              style={EventDetailStyle.eventDetailImage}
              key={index}
              source={{uri: item}}></Image>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export const EventDetailStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#F9FFFF',
  },
  eventDetailImage: {
    width: 400,
    height: 400,
  },
});

export default EventDetailPage;
