import React, {Component, useState, useEffect} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from 'react-native';
import {NoticeDetailAPI, getAccessToken} from '../../../config/AxiosFunction';
import {initialNoticeDetail, NoticeDetail} from '../../../models/noticeDetail';

type NoticeNavigator = {
  navigation?: any;
  route?: any;
};

const NoticeDetailPage = ({navigation, route}: NoticeNavigator) => {
  const [data, setData] = useState<NoticeDetail>(initialNoticeDetail);

  const GetData = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await NoticeDetailAPI(accessToken, route?.params.noticeId);
    console.log(response.data.id);
    setData(response.data);
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <>
      <SafeAreaView style={NoticeDetailStyle.container}>
        <View style={NoticeDetailStyle.headerArea}>
          <Text style={NoticeDetailStyle.header}>공지사항</Text>
        </View>
        <View style={NoticeDetailStyle.NoticeDetailArea}>
          <View>
            <Text style={NoticeDetailStyle.NoticeDetailTitle}>
              {data?.title}
            </Text>
            <Text style={NoticeDetailStyle.NoticeDetailWrite}>
              {data?.createdDate.substring(0, 10)}
            </Text>
            <View style={NoticeDetailStyle.NoticeDetailline}></View>
            <View>
              {data?.banner == null ? (
                <View></View>
              ) : (
                <Image
                  style={NoticeDetailStyle.NoticeDetailBanner}
                  source={{uri: data?.banner}}></Image>
              )}
            </View>
          </View>
          <View style={NoticeDetailStyle.NoticeDetailMargin}>
            <Text style={NoticeDetailStyle.NoticeDetailWrite}>
              {data?.content}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export const NoticeDetailStyle = StyleSheet.create({
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
  NoticeDetailBanner: {
    width: 310,
    height: 200,
    marginLeft: 25,
    marginTop: 30,
  },
  NoticeDetailArea: {
    marginLeft: 25,
    marginRight: 20,
    flex: 9,
  },
  NoticeDetailMargin: {
    marginTop: 20,
  },
  NoticeDetailTitle: {
    fontFamily: 'Apple SD Gothic Neo',
    fontStyle: 'normal',
    fontSize: 19,
  },
  NoticeDetailWrite: {
    fontSize: 14,
    marginTop: 10,
  },
  NoticeDetailline: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#E7E7E7',
  },
});

export default NoticeDetailPage;
