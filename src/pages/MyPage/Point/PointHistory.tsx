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
          <Text style={{fontSize: 25, fontWeight: '900'}}>11,928원</Text>
          <View style={NoticeListStyle.line}></View>
        </View>
        <View style={NoticeListStyle.listArea}>
          <TouchableOpacity>
            <View style={{flexDirection: 'column'}}>
              <Text style={NoticeListStyle.listWrite}>2022.12.27</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={NoticeListStyle.listTitle}>원 할머니 보쌈</Text>
                <Text
                  style={{
                    marginLeft: 180,
                    marginTop: 10,
                    fontSize: 22,
                    color: '#1E90FF',
                  }}>
                  + 800원
                </Text>
              </View>
              <Text>사용</Text>
            </View>
            <View style={NoticeListStyle.line}></View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{flexDirection: 'column'}}>
              <Text style={NoticeListStyle.listWrite}>2022.12.20</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={NoticeListStyle.listTitle}>미스터 피자</Text>
                <Text
                  style={{
                    marginLeft: 180,
                    marginTop: 10,
                    fontSize: 22,
                    color: '#CD1039',
                  }}>
                  - 2,000원
                </Text>
              </View>
              <Text>적립</Text>
            </View>
            <View style={NoticeListStyle.line}></View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{flexDirection: 'column'}}>
              <Text style={NoticeListStyle.listWrite}>2022.12.01</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={NoticeListStyle.listTitle}>김영섭 초밥</Text>
                <Text
                  style={{
                    marginLeft: 180,
                    marginTop: 10,
                    fontSize: 22,
                    color: '#1E90FF',
                  }}>
                  + 500원
                </Text>
              </View>
              <Text>적립</Text>
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
    borderWidth: 1,
    borderColor: '#E7E7E7',
  },
});

export default NoticeListPage;
