import {iteratorSymbol} from 'immer/dist/internal';
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
import {
  UserPointHistoryAPI,
  getAccessToken,
  UserSimpleAPI,
} from '../../../config/AxiosFunction';

/* UserPoint History List Data type */
type UserPointHistoryData = {
  id: number;
  eventAt: string;
  usePoint: number;
  reward: number;
  distance: number;
  storeName: string;
};

type UserSimpleData = {
  id: number;
  nickname: string;
  profile: string;
  point: string;
};

type UserPointHistoryNavigator = {
  navigation?: any;
  route?: any;
};

const NoticeListPage = ({navigation}: UserPointHistoryNavigator) => {
  const [data, setData] = useState<UserPointHistoryData[]>([]);
  const [point, setPoint] = useState<UserSimpleData>();

  const GetData = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await UserPointHistoryAPI(accessToken);
    console.log(response.data.content);
    setData(response.data.content);
  };

  const GetUserPoint = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await UserSimpleAPI(accessToken);
    console.log(response.data);
    setPoint(response.data);
  };

  // 포인트 리스트 경우의 수
  const PointList = (reward: number, usePoint: number) => {
    console.log(reward);
    console.log(usePoint);
    if (reward > 0 && usePoint == 0) {
      return (
        <Text
          style={{
            marginLeft: 100,
            marginTop: 10,
            fontSize: 22,
            color: '#1E90FF',
          }}>
          + {reward}P
        </Text>
      );
    } else if (reward == 0 && usePoint > 0) {
      return (
        <Text
          style={{
            marginLeft: 180,
            marginTop: 10,
            fontSize: 22,
            color: '#CD1039',
          }}>
          - {usePoint}P
        </Text>
      );
    } else if (reward > 0 && usePoint > 0) {
      return (
        <View>
          <Text
            style={{
              marginLeft: 100,
              marginTop: 10,
              fontSize: 15,
              color: '#1E90FF',
            }}>
            + {reward}P
          </Text>
          <Text
            style={{
              marginLeft: 100,
              marginTop: 10,
              fontSize: 15,
              color: '#CD1039',
            }}>
            - {usePoint}P
          </Text>
        </View>
      );
    }
  };

  useEffect(() => {
    GetData();
    GetUserPoint();
  }, []);

  /* 공지사항 상세 페이지 이동 */
  const goNoticeDetail = (id: number) => {
    navigation.navigate('NoticeDetailPage', {noticeId: id});
  };

  return (
    <>
      <ScrollView style={NoticeListStyle.container}>
        <View>
          <View style={NoticeListStyle.headerArea}>
            <Text style={{fontSize: 25, fontWeight: '900'}}>
              {point?.point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}P
            </Text>
            <View style={NoticeListStyle.line}></View>
          </View>
          <View style={NoticeListStyle.listArea}>
            {data.map((item: UserPointHistoryData) => (
              <TouchableOpacity>
                <View style={{flexDirection: 'column'}}>
                  <Text style={NoticeListStyle.listWrite}>
                    {item.eventAt.substring(0, 10)}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={NoticeListStyle.listTitle}>
                      {item.storeName}
                    </Text>
                    <View>{PointList(item.reward, item.usePoint)}</View>
                    <View></View>
                  </View>
                  {item.reward <= 0 ? (
                    <Text>사용</Text>
                  ) : item.usePoint <= 0 ? (
                    <Text>적립</Text>
                  ) : (
                    <Text>적립 및 사용</Text>
                  )}
                </View>
                <View style={NoticeListStyle.line}></View>
              </TouchableOpacity>
            ))}
          </View>
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
