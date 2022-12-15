import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Dimensions } from "react-native";

type BottomPopupProps = {
  goStatus: any
  goTest: any
}
const width = Dimensions.get('window').width;

const OrderList = (props: BottomPopupProps) => {

  //주문현황 페이지로 이동
  const goStatus = () => {
    props.goStatus();
  }
  const goTest = () => {
    props.goTest();
  }

  return (
    <>
      <SafeAreaView style={OrderWrapper.MainContainer}>
        <View style={OrderWrapper.CenterAlign} >
          <View style={OrderWrapper.ContentsBox}>
            <View style={[OrderWrapper.Horizontal, { marginLeft: 5 }]}>
              <Text style={OrderWrapper.FontText}>09.11(월) 17:00주문</Text>
              {/* <Text>{orderList.orderDate}</Text> */}
            </View>
            <View style={OrderWrapper.Vertical}>
              <View style={OrderWrapper.CenterAlign}>
                <Image
                  source={require('../../assets/main.png')}
                  style={{
                    justifyContent: "center",
                    alignItems: 'center',
                    borderRadius: 20,
                    width: 90, height: 90
                  }}
                />
              </View>
              <View
                style={[OrderWrapper.Horizontal, {
                  marginLeft: 15,
                  padding: 15
                }]}>
                <Text style={[OrderWrapper.FontText,
                {
                  fontSize: 15,
                  marginBottom: 10,
                  color: '#000000',
                  fontWeight: 'bold'
                }]}>미쁘동</Text>

                <Text style={[OrderWrapper.FontText,
                {
                  marginBottom: 10,
                  color: '#000000',
                  fontWeight: '500',
                }]}>미쁘동 / 일회용품 선택 O</Text>
                <Text style={[OrderWrapper.FontText,
                {
                  color: '#00C1DE',
                  fontWeight: '600',
                }]}>픽업시간 18:00</Text>
              </View>
            </View>
            <View style={OrderWrapper.Horizontal}>
              <TouchableOpacity
                onPress={goStatus}
                style={OrderWrapper.InActivateButton}>
                <Text style={OrderWrapper.ButtonText}>포장 대기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={goTest}
                style={[OrderWrapper.InActivateButton, { marginTop: 10 }]}>
                <Text style={OrderWrapper.ButtonText}>test</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View >
      </SafeAreaView>
    </>
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
  Horizontal: {
    flexDirection: 'column'
  },
  Vertical: {
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
  }
});

export default OrderList;
