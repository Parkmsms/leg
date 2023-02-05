import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { getCompleteOrderListAPI, getAccessToken, activeLocation } from '../../config/AxiosFunction';
import { Dimensions, ActivityIndicator, ScrollView } from "react-native";
import { OrderInfo } from '../../models/orderInfo';

type BottomPopupProps = {
  goReview: any
  goReviewItem: any
  goTestPage: any
}
type OrderCompleteProps = {
  route: any;
  navigation?: any;
}

const width = Dimensions.get('window').width;

// 완료된 주문 리스트
const CompleteList = (props: BottomPopupProps, { navigation, route }: OrderCompleteProps) => {
  const [OrderCompeteLst, setOrderCompeteLst] = useState<OrderInfo[]>([]);
  const [ready, setReady] = useState<boolean>(true);

  useEffect(() => {
    getCompleteOrderList();
    setTimeout(() => {
      setReady(false);
    }, 1000)
  }, [])


  //날짜 형태 변환
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
      let compDay =
        // new Date(param).getTime();
        //Test용 시간
        new Date('2022-12-27T16:20:12.480Z').getTime();
      let result: any = Math.floor((+(compDay) - +(today)) / 1000 / 60 / 60)

      if (result >= 0) {
        result = Math.floor((+(compDay) - +(today)) / 1000 / 60) + '분 후'
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

  const getCompleteOrderList = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response: any = await getCompleteOrderListAPI(accessToken);

    for (const key in response.data.content) {
      setOrderCompeteLst(OrderCompeteLst => [...OrderCompeteLst,
      {
        id: response.data.content[key]['id'],
        storeId: response.data.content[key]['storeId'],
        storeProfile: response.data.content[key]['storeProfile'],
        storeName: response.data.content[key]['storeName'],
        simpleMenu: response.data.content[key]['simpleMenu'],
        finalPrice: response.data.content[key]['finalPrice'],
        status: response.data.content[key]['status'],
        acceptAt: response.data.content[key]['acceptAt'],
        pickUpAt: response.data.content[key]['pickUpAt'],
        orderAt: dateFilter('orderAt', response.data.content[key]['orderAt']),
        doneAt: dateFilter('doneAt', response.data.content[key]['doneAt']),
        isReviewed: response.data.content[key]['isReviewed'],
        orderNo: response.data.content[key]['orderNo']
      },]);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {ready ?
        <View style={[OrderWrapper.container, OrderWrapper.horizontal]}>
          <ActivityIndicator size="small" />
        </View>
        :
        <ScrollView>
          {OrderCompeteLst.length !== 0 &&
            OrderCompeteLst?.map((order: OrderInfo, index: number) => {
              return (
                <SafeAreaView style={OrderWrapper.MainContainer} key={index}>
                  <View style={OrderWrapper.CenterAlign} >
                    <View style={OrderWrapper.ContentsBox}>
                      <View style={[OrderWrapper.Vertical, { marginLeft: 5 }]}>
                        <View style={OrderWrapper.Horizontal}>
                          <Text style={[OrderWrapper.FontText, { flex: 5 }]}>{order.orderAt}</Text>
                          {order.status === "USER_CANCEL" &&
                            <>
                              <View
                                style={[OrderWrapper.StatusButton, { flex: 2 }]}>
                                <Text style={OrderWrapper.StatusText}>주문 취소</Text>
                              </View>
                            </>
                          }
                          {order.status === "DONE" &&
                            <>
                              <View
                                style={[OrderWrapper.StatusButton, { flex: 2 }]}>
                                <Text style={OrderWrapper.StatusText}>주문 완료</Text>
                              </View>
                            </>
                          }
                        </View>
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
                            {order.doneAt}
                          </Text>
                        </View>
                      </View>
                      <View style={OrderWrapper.Horizontal}>
                        {order.status === "USER_CANCEL" &&
                          <>
                            <TouchableOpacity
                              style={OrderWrapper.ActivateButton}
                              onPress={() => {
                                props.goTestPage()
                              }}>
                              <Text style={OrderWrapper.ButtonText}>주문 상세</Text>
                            </TouchableOpacity>
                          </>
                        }
                        {order.status === "DONE" &&
                          <>
                            <TouchableOpacity
                              onPress={() => {
                                props.goReviewItem(order)
                              }}
                              style={OrderWrapper.ActivateButton}>
                              <Text style={OrderWrapper.ButtonText}>주문 상세</Text>
                            </TouchableOpacity>
                            {order.isReviewed === true && 
                              <View
                              style={OrderWrapper.AddPhotoButton}>
                              <Text style={OrderWrapper.AddPhotoButtonText}>리뷰 완료</Text>
                              </View>
                            }
                            {order.isReviewed === false && 
                              <TouchableOpacity
                              style={OrderWrapper.AddPhotoButton}
                              onPress={() => {
                                props.goReview(order)
                              }}>
                              <Text style={OrderWrapper.AddPhotoButtonText}>리뷰 쓰기</Text>
                              </TouchableOpacity>
                            }
                            
                          </>
                        }
                      </View>
                    </View>
                  </View >
                </SafeAreaView>
              )
            })}
          {OrderCompeteLst.length === 0 &&
            <View><Text>데이터가 없습니다.</Text></View>
          }
        </ScrollView>
      }
    </SafeAreaView>
  );
};

export const OrderWrapper = StyleSheet.create({
  MainContainer: {
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
    alignContent: 'center',
    flex: 2,
    margin: 5
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

  StatusButton: {
    backgroundColor: '#3E3E3E',
    borderRadius: 8,
    width: 22,
    justifyContent: 'center',
    alignContent: 'center'
  },
  StatusText: {
    fontSize: 16,
    fontFamily: 'Urbanist',
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },

  AddPhotoButtonText: {
    fontSize: 17,
    fontFamily: 'Apple SD Gothic Neo',
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#00C1DE',
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },

  AddPhotoButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderStyle: 'solid',
    borderColor: '#00C1DE',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
    flex: 2,
    margin: 5
  },
});

export default CompleteList;
