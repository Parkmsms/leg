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
  ImageBackground,
} from 'react-native';
import {EventListAPI, getAccessToken} from '../../../config/AxiosFunction';

/* 이벤트 리스트 Data */
type EventListData = {
  id: number; // 공지사항 ID
  title: string; // 공지사항 제목
  banner: string; // 이벤트 메인 배너
  pub: boolean;
  start: string; // 이벤트 시작 일자
  end: string; //  이벤트 종료 일자
};

/* 이벤트 Navigator type */
type EventListNavigator = {
  navigation?: any;
  route?: any;
};

const EventListPage = ({navigation, route}: EventListNavigator) => {
  const [data, setData] = useState<EventListData[]>([]);
  // 현재날짜
  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const nowDate = parseInt(year + month + day);
  console.log('nowDate ' + nowDate);

  // accessToken
  const GetData = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await EventListAPI(accessToken);
    setData(response.data.content);
  };

  /* 이벤트 상세 페이지 */
  const goEventDetailPage = (id: number) => {
    navigation.navigate('EventDetail', {eventId: id});
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <>
      <View style={EventListStyle.container}>
        <ScrollView>
          <View style={EventListStyle.eventListArea}>
            {data.map((item: EventListData) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => goEventDetailPage(item.id)}>
                {nowDate >
                parseInt(item.end.substring(0, 10).replace(/-/g, '')) ? (
                  <View style={{position: 'relative'}}>
                    <ImageBackground
                      style={EventListStyle.eventEndListImage}
                      imageStyle={{borderRadius: 20}}
                      source={{
                        uri: item.banner,
                      }}
                      resizeMode="cover"></ImageBackground>
                    <Text style={EventListStyle.eventPeriod}>마감</Text>
                  </View>
                ) : (
                  <View>
                    <ImageBackground
                      style={EventListStyle.eventListImage}
                      imageStyle={{borderRadius: 20}}
                      source={{
                        uri: item.banner,
                      }}
                      resizeMode="cover">
                      <Text style={EventListStyle.eventPeriod}>진행중</Text>
                    </ImageBackground>
                  </View>
                )}

                <View style={EventListStyle.eventListline}></View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export const EventListStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FFFF',
    paddingTop: 70,
  },
  eventListImage: {
    width: 370,
    height: 150,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    // tintColor: '#828282',
    // opacity: 0.3,
  },
  eventEndListImage: {
    width: 370,
    height: 150,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    tintColor: '#828282',
    opacity: 0.3,
  },
  eventListArea: {
    marginLeft: 25,
    marginRight: 20,
  },
  eventListline: {
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E7E7E7',
  },
  eventPeriod: {
    textAlign: 'right',
    // marginTop: 110,
    // marginRight: 30,
    top: 115,
    right: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    position: 'absolute',
  },
  eventEnd: {},
});

export default EventListPage;
