import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from 'react-native/Libraries/NewAppScreen';

/* 문의사항 Navigator type */
type InquireNavigator = {
  navigation?: any;
  route?: any;
};

const InquirePage = ({navigation}: InquireNavigator) => {
  return (
    <>
      <View style={InquireStyle.container}>
        <View style={InquireStyle.inquireArea}>
          <Text style={InquireStyle.inquireText}>이메일 문의</Text>
          <Icon name="mail-outline" size={40} color="blue" />
        </View>
        <View style={InquireStyle.emailArea}>
          <Text style={InquireStyle.email}>werow2021@naver.com</Text>
          <Text style={InquireStyle.emailText}>
            궁금한 점이 있거나 오류가 있을 경우,위 이메일로 문의바랍니다.
          </Text>
        </View>
      </View>
    </>
  );
};

export const InquireStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: '#F9FFFF',
  },
  inquireArea: {
    marginLeft: 50,
    flexDirection: 'row',
  },
  inquireText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 10,
  },
  emailArea: {
    marginLeft: 50,
    marginTop: 15,
  },
  email: {
    textDecorationLine: 'underline',
    fontSize: 17,
  },
  emailText: {
    marginTop: 10,
    marginRight: 70,
  },
});

export default InquirePage;
