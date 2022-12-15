import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";

type OrderListPagePros = {
  route: any;
  navigation?: any;
}

const OrderList = ({ navigation, route }: OrderListPagePros) => {
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    console.log(route.params?.postId);
    console.log(route.params?.itemSets);
    console.log(route.params?.totalPrice);
  }, [])

  const minusAmount = () => {
    setTotalAmount(totalAmount - 5);
  }
  const plusAmount = () => {
    setTotalAmount(totalAmount + 5);
  }
  return (
    <ScrollView style={OrderWrapper.MainContainer}>

      <View style={{ paddingTop: 10 }}>
        <Text style={{ color: 'black', fontFamily: 'Apple SD Gothic Neo', fontSize: 20, fontWeight: '800' }}>주문상품 총 1개</Text>
        <View style={{
          paddingTop: 20,
          flex: 0.1,
          borderStyle: 'solid',
          borderBottomWidth: 2,
          borderColor: 'lightgray',
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center'
        }}></View>

      </View>

      <View style={{ paddingTop: 10 }}>
        <Text style={{ color: 'black', fontFamily: 'Apple SD Gothic Neo', fontSize: 20, fontWeight: '800' }}>
          픽업시간 설정
        </Text>

        <Text style={{ paddingTop: 10 }}>
          몇분 후에 픽업하길 원하시나요? 설정해주세요.</Text>
        <View style={{
          flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignSelf: 'center', alignItems: 'center', alignContent: 'center'
        }}>
          <TouchableOpacity
            onPress={minusAmount}
            disabled={totalAmount === 0 ? true : false}>
            <AntIcon name="minuscircleo" size={25} style={{ color: '#00C1DE' }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 25, color: '#00C1DE', padding: 10 }}>
            {totalAmount}분
          </Text>
          <TouchableOpacity
            onPress={plusAmount}>
            <AntIcon name="pluscircleo" size={25} style={{ color: '#00C1DE' }} />
          </TouchableOpacity>
        </View>
        <View style={{
          paddingTop: 10,
          flex: 0.1,
          borderStyle: 'solid',
          borderBottomWidth: 2,
          borderColor: 'lightgray',
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center'
        }}></View>
      </View>

      <View style={{ paddingTop: 10 }}>
        <Text style={{ color: 'black', fontFamily: 'Apple SD Gothic Neo', fontSize: 20, fontWeight: '800' }}>
          요청사항</Text>
        <View style={{
          paddingTop: 20,
          flex: 0.1,
          borderStyle: 'solid',
          borderBottomWidth: 2,
          borderColor: 'lightgray',
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center'
        }}></View>
      </View>

      <View style={{ paddingTop: 10 }}>
        <Text style={{ color: 'black', fontFamily: 'Apple SD Gothic Neo', fontSize: 20, fontWeight: '800' }}>
          쿠폰 / 포인트</Text>
        <Text style={{ paddingTop: 10 }}>
          쿠폰</Text>
        <View style={{
          flex: 0.1,
          borderStyle: 'solid',
          borderBottomWidth: 2,
          borderColor: 'lightgray',
          width: '70%',
          justifyContent: 'center',
          alignContent: 'center'
        }}></View>
        <Text style={{ paddingTop: 10 }}>
          포인트</Text>
        <View style={{
          flex: 0.1,
          borderStyle: 'solid',
          borderBottomWidth: 2,
          borderColor: 'lightgray',
          width: '70%',
          justifyContent: 'center',
          alignContent: 'center'
        }}></View>
        <Text style={{ paddingTop: 10 }}>
          잔여 포인트 0 P</Text>
        <View style={{
          paddingTop: 20,
          flex: 0.1,
          borderStyle: 'solid',
          borderBottomWidth: 2,
          borderColor: 'lightgray',
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center'
        }}></View>
      </View>

      <View style={{ paddingTop: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20 }}>
          <Text style={{ color: 'black', fontFamily: 'Apple SD Gothic Neo', fontSize: 20, fontWeight: '800' }}>
            총 결제금액</Text>
          <Text style={{ fontSize: 20, color: '#00C1DE', fontWeight: 'bold' }}>
            15,000원
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }}>
          <Text style={{ color: 'gray', fontFamily: 'Apple SD Gothic Neo', fontSize: 15, fontWeight: '800' }}>
            상품금액</Text>
          <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>
            15,000원
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }}>
          <Text style={{ color: 'gray', fontFamily: 'Apple SD Gothic Neo', fontSize: 15, fontWeight: '800' }}>
            쿠폰 금액</Text>
          <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>
            0원
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }}>
          <Text style={{ color: 'gray', fontFamily: 'Apple SD Gothic Neo', fontSize: 15, fontWeight: '800' }}>
            포인트 할인</Text>
          <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>
            0원
          </Text>
        </View>
        <View style={{
          paddingTop: 20,
          flex: 0.1,
          borderStyle: 'solid',
          borderBottomWidth: 2,
          borderColor: 'lightgray',
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center'
        }}></View>

      </View>

    </ScrollView >
  )
}
const OrderWrapper = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10
  }
})
export default OrderList;