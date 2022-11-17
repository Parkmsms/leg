import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from 'react-native';

const MyPage = ({navigation}: {navigation: any}) => {
  return (
    <>
      <SafeAreaView style={MyPageStyle.container}>
        <View style={MyPageStyle.borderBox}>
          <View style={MyPageStyle.borderBoxInner}>
            <Image
              source={require('../assets/main.png')}
              style={MyPageStyle.profileImage}
            />
            <View>
              <Text style={MyPageStyle.profileInfo}>응암동 라모스</Text>
              <Text>서울 특별시 관악구 관악로 1</Text>
            </View>
          </View>
        </View>
        <View style={MyPageStyle.mypageBox}>
          <View style={MyPageStyle.mypageRow}>
            <TouchableOpacity
              onPress={() => navigation.navigate('NoticeStylePage')}>
              <Text style={MyPageStyle.mypageFont}>공지사항</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('EventList')}>
              <Text style={MyPageStyle.mypageFont}>이벤트</Text>
            </TouchableOpacity>
          </View>
          <Text style={MyPageStyle.mypageFont}>문의하기</Text>
          <Text style={MyPageStyle.mypageFont}>앱 공유하기</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export const MyPageStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FFFF',
  },
  borderBox: {
    flex: 1,
    marginTop: 55,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#00C1DE',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  borderBoxInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    fontWeight: 'bold',
    fontSize: 20,
    fontStyle: 'normal',
  },
  profileImage: {
    marginLeft: 30,
    marginRight: 40,
    borderColor: '#00C1DE',
    borderWidth: 2,
    borderRadius: 70,
    width: 80,
    height: 80,
  },
  mypageBox: {
    flex: 3,
  },
  mypageRow: {
    flexDirection: 'column',
  },
  mypageFont: {
    marginTop: 30,
    marginLeft: 50,
    fontSize: 15,
    fontWeight: 'bold',
  },
  mypageImage: {
    // marginTop: 30,
    // marginLeft: 10,
    // fontSize: 15,
  },
});

export default MyPage;
