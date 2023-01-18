import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Dimensions } from "react-native";
import { getInProgressOrderListAPI, getAccessToken, orderFinishAPI, orderCancleAPI } from '../../config/AxiosFunction';
import { OrderInfo } from '../../models/orderInfo';
import { useSelector, useDispatch } from 'react-redux';
import {
  doTimer,
} from '../../slices/time';
import OrderConfirmPopUp from "../../components/Modal/OrderConfirmPopUp";
import OrderAlertPopup from '../../components/Modal/OrderAlertPopUp';
import OrderAlertPopUp from '../../components/Modal/OrderAlertPopUp';

type BottomPopupProps = {
  goStatus: any
  goRefresh: any
  goTestPage:any
}

type OrderStatusListProps = {
  route: any;
  navigation?: any;
}
const width = Dimensions.get('window').width;
const OrderStatusList = (props: BottomPopupProps, { navigation, route }: OrderStatusListProps) => {
  const dispatch = useDispatch();
  //임시 accessToken 
  const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJsZWciLCJpYXQiOjE2NzM0Mjg5NjAsInN1YiI6IjExIiwidG9rZW5UeXBlIjp0cnVlLCJhY2NvdW50VHlwZSI6IlVTRVIiLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9VU0VSIn1dfQ.3VZvbwQVoPOEIvC9iOlNLf3Nb9LZ1IwR9ye89SgzEhH1Rc1w-7QWFCvLsQ_fAffoO6h-Tf8BanmBjakgLSL4gQ'
  const [OrderLst, setOrderLst] = useState<OrderInfo[]>([]);
  const [ready, setReady] = useState<boolean>(true);
  const [selectedItemId, setSelectedItemId] = useState<number>(0)
  /*Modal State */
  //confirm Modal Open
  const [modalOpen, setModalOpen] = useState(false);
  //alert Modal Open
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    getOrderList();
    setTimeout(() => {
      setReady(false);
    }, 100)
  }, [])

  /*Confrim Modal Component*/
  const closeModal = () => {
    setModalOpen(false);
    setAlertOpen(false);
  }
  //Modal Oepn, Set selected item Id 
  const openModal = (param: number) => {
    setSelectedItemId(param)
    setModalOpen(true);
  }
  //Do not action
  const openResult = () => {
    console.log("Do not anything")
  }
  //OrderConfirmPopUp confrim Modal에서 취소 확인 클릭 시 
  const openCancle = async () => {
    await orderCancleAPI(accessToken, selectedItemId);
    
    setModalOpen(false);
    setAlertOpen(true)
  }
  //현재화면 새로고침
  const refresh = () => {
    setAlertOpen(false);
    props.goRefresh();
  }

  /*Modal End*/

  //상품 상세페이지 이동, redux store상태 변경 
  const goStatus = async (param: any) => {
    const response: any = await getInProgressOrderListAPI(accessToken);
    const findResult = response.data.content.find((val: { id: number }) => val.id === param.id);
    dateFilter('pickUpAt', { date: findResult.pickUpAt });
    props.goStatus(param);
  }

  const dateFilter = (val: string, param?: any) => {
    if (param.date == null) {
      return '없음'
    }
    else if (param.date !== null) {
      let fullDate = param.date.toString().replace('T', ' ')
      let dayStr = new Date(param.date)
      const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
      let week = WEEKDAY[dayStr.getDay()];
      let year = fullDate.slice(2, 4);
      let month = fullDate.slice(5, 7);
      let day = fullDate.slice(8, 10);
      let time = fullDate.slice(11, 16);
      if (val === 'pickUpAt') {
        let today = new Date().getTime();
        let compDay = new Date(param.date).getTime();

        let result: any = Math.floor((+(compDay) - +(today)) / 1000 / 60 / 60)

        if (result >= 0) {
          let data = (+(compDay) - +(today)) / 1000 / 60

          //한시간 이상
          if (result >= 1) {
            let hh = data / 60;
            let mm = data % 60;
            result = `${Math.floor(hh)}시간 ${Math.floor(mm)}분 후`
          } else {
            result = Math.floor(data) + '분 후'
          }
          const timeSetParam = {
            t_minutes: Math.floor(data)
          }
          dispatch(doTimer(timeSetParam));
        }
        else {
          dispatch(doTimer({ t_minutes: 0 }));
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
  }

  /* OrderList Data */
  const getOrderList = async () => {
    // const accessToken = await getAccessToken('accessToken');
    //임시 accessToken값
    const response: any = await getInProgressOrderListAPI(accessToken);

    for (const key in response.data.content) {
      setOrderLst(OrderLst => [...OrderLst,
      {
        id: response.data.content[key]['id'],
        storeId: response.data.content[key]['storeId'],
        storeProfile: response.data.content[key]['storeProfile'],
        storeName: response.data.content[key]['storeName'],
        simpleMenu: response.data.content[key]['simpleMenu'],
        finalPrice: response.data.content[key]['finalPrice'],
        status: response.data.content[key]['status'],
        acceptAt: response.data.content[key]['acceptAt'],
        pickUpAt: dateFilter('pickUpAt', { date: response.data.content[key]['pickUpAt'], id: response.data.content[key]['id'] }),
        orderAt: dateFilter('orderAt', { date: response.data.content[key]['orderAt'], id: response.data.content[key]['id'] }),
        doneAt: response.data.content[key]['doneAt'],
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
          {OrderLst.length !== 0 &&
            OrderLst?.map((order: OrderInfo, index: number) => {
              return (
                <SafeAreaView style={OrderWrapper.MainContainer} key={index}>
                  <View style={OrderWrapper.CenterAlign} >
                    <View style={OrderWrapper.ContentsBox}>
                      <View style={[OrderWrapper.Vertical, { marginLeft: 5 }]}>
                        <View style={OrderWrapper.Horizontal}>
                          <Text style={[OrderWrapper.FontText, { flex: 5 }]}>{order.orderAt}</Text>
                          {order.status === "REQUEST" &&
                            <>
                              <View
                                style={[OrderWrapper.StatusButton, { flex: 2 }]}>
                                <Text style={OrderWrapper.StatusText}>포장 요청</Text>
                              </View>
                            </>
                          }
                          {order.status === "ACCEPT" &&
                            <>
                              <View
                                style={[OrderWrapper.StatusButton, { flex: 2 }]}>
                                <Text style={OrderWrapper.StatusText}>주문 수락</Text>
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
                            {order.status === "ACCEPT" ? order.pickUpAt : ''}
                          </Text>
                        </View>
                      </View>
                      <View style={OrderWrapper.Horizontal}>
                        {order.status === "REQUEST" &&
                          <>
                            <TouchableOpacity
                              onPress={() => openModal(order.id)}
                              style={[OrderWrapper.cancleButton]}>
                              <Text style={OrderWrapper.cancleButtonText}>주문 취소</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() =>
                                props.goTestPage()
                              }
                              style={[OrderWrapper.ActivateButton]}>
                              <Text style={OrderWrapper.ButtonText}>주문 상세</Text>
                            </TouchableOpacity>
                            
                          </>
                        }

                        {order.status === "ACCEPT" &&
                          <>
                            <TouchableOpacity
                              onPress={() =>
                                goStatus(order)
                              }
                              style={[OrderWrapper.AddPhotoButton]}>
                              <Text style={OrderWrapper.AddPhotoButtonText}>주문 현황</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() =>
                                props.goTestPage()
                              }
                              style={[OrderWrapper.ActivateButton]}>
                              <Text style={OrderWrapper.ButtonText}>주문 상세</Text>
                            </TouchableOpacity>
                          </>
                        }
                      </View>
                    </View>
                  </View >
                </SafeAreaView>
              )
            })}
          {OrderLst.length === 0 &&
            <View><Text>데이터가 없습니다.</Text></View>
          }
          <OrderConfirmPopUp
            id={selectedItemId}
            open={modalOpen}
            close={closeModal}
            title={"주문 취소"}
            subTitle={`선택하신 주문을 취소하시겠습니까?`}
            openResult={openResult}
            openCancle={openCancle}
          />

          <OrderAlertPopUp
            open={alertOpen}
            close={closeModal}
            title={"취소 완료"}
            refresh={refresh}
          />

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
    alignContent: 'center',
    margin: 5,
    flex: 2
  },
  cancleButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderStyle: 'solid',
    borderColor: '#ee5960',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
    margin: 5,
    flex: 2
  },
  cancleButtonText: {
    fontSize: 17,
    fontFamily: 'Apple SD Gothic Neo',
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#ee5960',
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
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
    margin: 5,
    flex: 2
  },
});

export default OrderStatusList;
