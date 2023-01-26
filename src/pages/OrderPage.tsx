import React, { useEffect, useState } from 'react';;
import { useWindowDimensions, Text, StyleSheet, Alert, Image } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import OrderStatusList from './Order/OrderStatusList';
import OrderCompleteList from './Order/OrderCompleteList';
import { useIsFocused } from '@react-navigation/native';
type OrderPageProps = {
  navigation?: any;
  route: any;
}
const OrderPage = ({ navigation, route }: OrderPageProps) => {
  const isFocused = useIsFocused();
  const [focused, setFocused] = useState<boolean>(isFocused);

  const layout = useWindowDimensions();
  //주문내역
  const FirstRoute = () => (
    <OrderStatusList goStatus={goDtail} goRefresh={goRefresh} goTestPage={goTestPage} />
  );
  //주문 완료 내역
  const SecondRoute = () => (
    <OrderCompleteList goReview={goReview} goReviewItem={onReviewPage} goTestPage={goTestPage} />
  );


  //자식페이지에서 넘겨받은 함수
  //주문 현황 페이지로 이동
  const goDtail = (param: any) => {
    navigation.navigate('OrderStatus', { param: param })
  }
  //리뷰 페이지로 이동
  const goReview = (param: any) => {
    navigation.navigate('ReviewPage', { orderId: param.id })
  }
  //현재화면 새로고침
  const goRefresh = () => {
    setFocused((val) => val = !val);
  }
  //test용 리뷰페이지 넘어가기
  const onReviewPage = (storeInfo: any) => {
    navigation.navigate('ReviewItem', { storeInfo: storeInfo })
  }

  const goTestPage = () => {
    navigation.navigate('OrderDetailPage')
  }

  useEffect(() => {
  }, [focused])


  const renderScene = SceneMap({
    OrderList: FirstRoute,
    OrderCompleteList: SecondRoute,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'OrderList', title: '주문 내역' },
    { key: 'OrderCompleteList', title: '완료 내역' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => (
        <TabBar
          inactiveColor='green'
          activeColor='black'
          {...props}
          indicatorStyle={{
            backgroundColor: "#131313",
          }}
          style={{
            paddingTop: 50,
            backgroundColor: "white",
            shadowOffset: { height: 0, width: 0 },
            shadowColor: "transparent",
          }}
          pressColor={"transparent"}
          renderLabel={({ route, focused }) => {
            if (focused) {
              return (
                <Text style={OrderWrapper.ActiveFont}>
                  {route.title}
                </Text>
              )
            }
            else {
              return (
                <Text style={OrderWrapper.InActiveFont}>
                  {route.title}
                </Text>
              )
            }
          }
          }
        />
      )}
    />
  );
}

export const OrderWrapper = StyleSheet.create({
  ActiveFont: {
    fontFamily: 'Apple SD Gothic Neo',
    fontStyle: 'normal',
    fontWeight: '600',
    letterSpacing: 0.5,
    margin: 8,
    color: '#000000'
  },
  InActiveFont: {
    fontFamily: 'Apple SD Gothic Neo',
    fontStyle: 'normal',
    fontWeight: '600',
    letterSpacing: 0.5,
    margin: 8,
    color: '#8C8C8C'
  }
});

export default OrderPage;

