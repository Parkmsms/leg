import React, { useEffect, useState } from 'react';;
import { useWindowDimensions, Text, StyleSheet, Alert, Image } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import OrderStatusList from './Order/OrderStatusList';
import OrderCompleteList from './Order/OrderCompleteList';

type OrderPageProps = {
  navigation?: any;
  route: any;
}
const OrderPage = ({ navigation, route }: OrderPageProps) => {

  const layout = useWindowDimensions();
  //주문내역
  const FirstRoute = () => (
    <OrderStatusList goStatus={goDtail} />
  );
  //주문 완료 내역
  const SecondRoute = () => (
    <OrderCompleteList goReview={goReview} />
  );

  //주문 현황 페이지로 이동
  const goDtail = (param: any) => {
    navigation.navigate('OrderStatus', { param: param })
  }

  //리뷰 페이지로 이동
  const goReview = () => {
    navigation.navigate('ReviewPage')
  }


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

