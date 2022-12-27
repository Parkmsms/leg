import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Dimensions } from "react-native";
import { getInProgressOrderListAPI, getAccessToken } from '../../config/AxiosFunction';
import { OrderInfo } from '../../models/orderInfo';
import { useSelector, useDispatch } from 'react-redux';
import {
  doTimer,
} from '../../slices/time';

type BottomPopupProps = {
  goStatus: any
}
const width = Dimensions.get('window').width;

const OrderStatusList = (props: BottomPopupProps) => {
  const dispatch = useDispatch();
  const [OrderLst, setOrderLst] = useState<OrderInfo[]>([]);
  const [ready, setReady] = useState<boolean>(true);


  const goStatus = (param: any) => {
    props.goStatus(param);
  }
  useEffect(() => {
    // 아직 데이터가 없을때 바로 예외처리로 넘어가기 때문에 api 조회 주석처리
    setTimeout(() => {
      getOrderList();
      setReady(false);
    }, 500)
  }, [ready])

  const dateFilter = (val: string, param: string) => {
    let fullDate = param.toString().replace('T', ' ')
    let dayStr = new Date(param)
    const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
    let week = WEEKDAY[dayStr.getDay()];
    let year = fullDate.slice(2, 4);
    let month = fullDate.slice(5, 7);
    let day = fullDate.slice(8, 10);
    let time = fullDate.slice(11, 16);
    if (val === 'pickUpAt') {
      let today = new Date().getTime();

      //Test용 시간
      let compDay = new Date('2022-12-27T17:58:12.480Z').getTime();
      //let compDay = new Date(param).getTime(); <<차후 이거로 변경

      let result: any = Math.floor((+(compDay) - +(today)) / 1000 / 60 / 60)

      if (result >= 0) {

        let data = (+(compDay) - +(today)) / 1000 / 60
        result = Math.floor(data) + '분 후'

        const timeSetParam = {
          t_seconds: 59,
          t_minutes: Math.floor(data) - 1
        }
        dispatch(doTimer(timeSetParam));
      }
      else {
        result = '시간만료'
      }
      return result
    }
    else if (val === 'orderAt') {
      return `${year}.${month}.${day}(${week}) ${time} 주문`
    }
    else if (val === 'doneAt') {
      return `${year}.${month}.${day}(${week}) ${time} 완료`
    }
    else {
      return param;
    }
  }

  const getOrderList = async () => {
    // const accessToken = await getAccessToken('accessToken');
    //임시 accessToken값
    const response: any = await getInProgressOrderListAPI('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJsZWciLCJpYXQiOjE2NzE0MTA4NzEsInN1YiI6IjEwMTYiLCJ0b2tlblR5cGUiOnRydWUsImFjY291bnRUeXBlIjoiVVNFUiIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJST0xFX1VTRVIifV19.U-FmO73zLO6mm2Mt5QPN3NLIXfHwom7xmeoamhCA4wjRoOO6dqm36uj0G5x-1QhKzXOtdBaT0ThIef8SmP7usA');
    for (const key in response.data.content) {
      setOrderLst(() => {
        return [
          {
            id: response.data.content[key]['id'],
            storeProfile: response.data.content[key]['storeProfile'],
            storeName: response.data.content[key]['storeName'],
            simpleMenu: response.data.content[key]['simpleMenu'],
            finalPrice: response.data.content[key]['finalPrice'],
            status: response.data.content[key]['pickUpAt'],
            acceptAt: response.data.content[key]['acceptAt'],
            // test <데이터가 없어서 mockup>
            pickUpAt: dateFilter('pickUpAt', '2022-12-21T16:20:12.480Z'),
            // pickUpAt: response.data.content[key]['pickUpAt'],
            orderAt: dateFilter('orderAt', response.data.content[key]['orderAt']),
            doneAt: response.data.content[key]['doneAt'],
          },
        ]
      });
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {ready ?
        <View style={[OrderWrapper.container, OrderWrapper.horizontal]}>
          <ActivityIndicator size="large" />
        </View>
        :
        <ScrollView>
          {OrderLst.length !== 0 &&
            OrderLst?.map((order: OrderInfo, index: number) => {
              return (
                <SafeAreaView style={OrderWrapper.MainContainer} key={index}>
                  <View style={OrderWrapper.CenterAlign} >
                    <View style={OrderWrapper.ContentsBox}>
                      <View style={[OrderWrapper.Vertical, { marginLeft: 5 }]}>
                        <Text style={OrderWrapper.FontText}>{order.orderAt}</Text>
                      </View>
                      <View style={OrderWrapper.Horizontal}>
                        <View style={OrderWrapper.CenterAlign}>
                          <Image
                            // source={require('../../assets/main.png')}
                            source={{ uri: order.storeProfile ? order.storeProfile : 'none' }}
                            style={{
                              width: 90,
                              height: 90,
                              aspectRatio: 1.1,
                              resizeMode: 'contain'
                            }}
                          />
                        </View>
                        <View
                          style={[OrderWrapper.Vertical, {
                            marginLeft: 15,
                            padding: 15
                          }]}>
                          <Text style={[OrderWrapper.FontText,
                          {
                            fontSize: 15,
                            marginBottom: 10,
                            color: '#000000',
                            fontWeight: 'bold'
                          }]}>{order.storeName}</Text>

                          <Text style={[OrderWrapper.FontText,
                          {
                            marginBottom: 10,
                            color: '#000000',
                            fontWeight: '500',
                          }]}>{order.simpleMenu}</Text>
                          <Text style={[OrderWrapper.FontText,
                          {
                            color: '#00C1DE',
                            fontWeight: '600',
                          }]}>
                            {order.pickUpAt}
                            {/* {order.doneAt} */}
                          </Text>
                        </View>
                      </View>
                      <View style={OrderWrapper.Vertical}>
                        <TouchableOpacity
                          onPress={() =>
                            goStatus(order)
                          }
                          style={OrderWrapper.InActivateButton}>
                          <Text style={OrderWrapper.ButtonText}>포장 대기</Text>
                        </TouchableOpacity>

                      </View>
                    </View>
                  </View >
                </SafeAreaView>
              )
            })}
          {OrderLst.length === 0 &&
            <View><Text>데이터가 없습니다.</Text></View>
          }
        </ScrollView>
      }
    </SafeAreaView>

  );
};


export const OrderWrapper = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#F3F3F3'
  },
  CenterAlign: {
    justifyContent: "center",
    alignItems: 'center',
  },
  ContentsBox: {
    borderWidth: 1,
    width: width,
    marginTop: 20,
    sborderRadius: 1,
    paddingLeft: 26,
    paddingRight: 26,
    paddingTop: 15,
    paddingBottom: 15,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    backgroundColor: 'white',
  },
  Vertical: {
    flexDirection: 'column'
  },
  Horizontal: {
    flexDirection: 'row'
  },
  ActivateButton: {
    backgroundColor: '#00C1DE',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    alignContent: 'center'
  },
  InActivateButton: {
    backgroundColor: '#3E3E3E',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    alignContent: 'center'
  },
  ButtonText: {
    fontSize: 17,
    fontFamily: 'Urbanist',
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  FontText: {
    fontFamily: 'Apple SD Gothic Neo',
    fontStyle: 'normal',
    letterSpacing: 0.5,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: 'background-color: rgba(0, 0, 0, 0.01)'
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
});

export default OrderStatusList;
