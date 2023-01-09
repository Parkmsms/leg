import React, { useRef, useEffect, useState } from 'react';
import { Alert, Image, Modal, Dimensions, StyleSheet, Text, Button, TouchableOpacity, View, FlatList, SafeAreaView, ListRenderItemInfo, ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { getReviewAPI } from '../../config/AxiosFunction';
import { Review } from '../../models/reviewInfo';
import Stars from 'react-native-stars';
import store from '../../store/index';

type ReviewItem = {
  navigation?: any,
  route: any,
}

const width = Dimensions.get('window').width;
const ReviewItem = ({ navigation, route }: ReviewItem) => {
  const LIMIT = 10;
  const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJsZWciLCJpYXQiOjE2NzIyOTQ2MDAsInN1YiI6IjExIiwidG9rZW5UeXBlIjp0cnVlLCJhY2NvdW50VHlwZSI6IlVTRVIiLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9VU0VSIn1dfQ.IrcHhRVSYtyu5txFOhcgF-4oYLlCi7TQd7v5hGPxJaGEJOcOuB1X3jUQR88FU68foc6FMPw_UASxRiBaclkplg'
  // const [ready, setReady] = useState<boolean>(true);
  const [data, setData] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [starAvg, setStarAvg] = useState<string>('')

  // const page = useRef(1);

  const renderItem = ({ item }: ListRenderItemInfo<Review>) => {
    return (
      <View style={[MainWrapper.ContainerBox, { backgroundColor: '#f1fcfd', marginLeft: 20, marginRight: 20 }]}>
        {/* 프로필,이름,별점,등록날짜 */}
        <Text style={[MainWrapper.FontText, { fontSize: 12, marginLeft: 10, marginBottom: 6 }]}>{dateFilter(item.reviewCreatedDate)}</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image source={{ uri: item.userProfile ? item.userProfile : 'none' }}
              // <Image source={require('../../assets/main.png')}
              style={{ width: 38, height: 38, borderRadius: 37.5 }} />
          </View>
          <View style={{ flex: 7, marginLeft: 10 }}>
            <View style={{ flexDirection: 'row', }}>
              <View >
                <Text style={[MainWrapper.FontText, { fontWeight: 'bold' }]}>{item.userNickname}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Stars
                    default={item.reviewStar}
                    count={5}
                    starSize={5}
                    disabled
                    fullStar={<Icon name={'star'} color={"#00C1DE"} size={12} />}
                    emptyStar={<Icon name={'star-outline'} color={"grey"} size={12} />}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* 사진 */}
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Image
            style={{
              width: 150,
              height: 150,
              resizeMode: 'contain',
              overflow: 'hidden'
            }}
            // source={require('../../assets/main.png')} />
            source={{ uri: item.reviewImages ? item.reviewImages[0] : 'none' }} />
        </View>

        {/* 리뷰내용, 태그 */}
        <View style={{ width: width * 0.7, margin: 15 }}>
          <View>
            <Text style={MainWrapper.FontText}>{item.reviewComment}</Text>
          </View>
          {/* <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity>
              <View style={{ alignItems: 'baseline' }}>
                <View style={{
                  backgroundColor: '#f3f3f3',
                  borderRadius: 30,
                  marginTop: 3,
                  marginLeft: 3,
                  padding: 3,
                  alignItems: 'baseline',
                  flexDirection: 'row'
                }}>
                  <Text style={{ color: "#00C1DE", fontSize: 10 }}>#연어소바</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{ alignItems: 'baseline' }}>
                <View style={{
                  backgroundColor: '#f3f3f3',
                  borderRadius: 30,
                  marginTop: 3,
                  marginLeft: 3,
                  padding: 3,
                  alignItems: 'baseline',
                  flexDirection: 'row'
                }}>
                  <Text style={{ color: "#00C1DE", fontSize: 10 }}>#일식</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View> */}
        </View>
        {item.reply !== null &&
          <View
            style={[MainWrapper.ContainerBox, { backgroundColor: 'white' }]}>
            <View style={{ flexDirection: 'row', }}>
              <View >
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[MainWrapper.FontText, { fontSize: 13, fontWeight: 'bold', color: 'black' }]}>사장님</Text>
                  <Text style={[MainWrapper.FontText, { fontSize: 12, marginLeft: 3 }]}>-{dateFilter(item.replyCreatedDate)}</Text>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 13, color: 'black' }}>
                {item.reply}
              </Text>
            </View>
          </View>
        }
      </View>
    );
  };

  // const getData = () => {
  //   setLoading(true);
  //   fetch(`http://0giri.com/api/reviews?storeId=${route.params?.storeId}`)
  //     .then((res) => res.json())
  //     .then((res) => setData(data.concat(res.slice(offset, offset + LIMIT))))
  //     .then(() => {
  //       setOffset(offset + LIMIT);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       Alert.alert("에러가 났습니다");
  //     });
  // }

  const getData = async () => {
    setLoading(true);
    let sumStar = 0
    const response = await getReviewAPI(accessToken, route.params?.storeInfo.storeId);

    response.data.content.forEach((product: any) => {
      sumStar += product.reviewStar;
    });

    setStarAvg(((sumStar / response.data.content.length).toFixed(1)))
    setData(data.concat(response.data.content.slice(offset, offset + LIMIT)))
    setLoading(false);
    setOffset(offset + LIMIT);

  }

  const dateFilter = (param: string) => {
    let fullDate = param.toString().replace('T', ' ')
    let dayStr = new Date(param)
    const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
    let week = WEEKDAY[dayStr.getDay()];
    let year = fullDate.slice(2, 4);
    let month = fullDate.slice(5, 7);
    let day = fullDate.slice(8, 10);
    let time = fullDate.slice(11, 16);

    return `${year}.${month}.${day}(${week}) ${time}`
  }


  // const getData = () => {
  //   setLoading(true);
  //   fetch("http://jsonplaceholder.typicode.com/posts")
  //     .then((res) => res.json())
  //     .then((res) => setData(data.concat(res.slice(offset, offset + LIMIT))))
  //     .then(() => {
  //       setOffset(offset + LIMIT);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       Alert.alert("에러가 났습니다");
  //     });
  // };

  useEffect(() => {
    getData();
  }, [])

  // here
  const onEndReached = () => {
    if (loading) {
      return;
    } else {
      getData();
    }
  };

  // const getData = async () => {
  //     try {
  //       // review 목록불러오기
  //       const response = await reviewInfoList(route.params?.itemCd, page.current,3)
  //       console.log(response.data);
  //       if (response.status === 200){
  //         ++page.current
  //         setReviewInfo(response.data.reviewList)
  //       }
  //     } catch {
  //     //   setModalVisible(true)
  //     }
  //   }

  return (

    <SafeAreaView style={MainWrapper.MainContainer}>
      <View style={MainWrapper.ReviewPageHeader}>
        <View style={MainWrapper.ReviewPageHeaderFrame}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: "center",
            }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 15,
              color: 'black'
            }}>리뷰👩🏻‍💻</Text>
            <View>
              <Text style={[MainWrapper.FontText, { fontSize: 16, fontWeight: '400', color: 'black' }]} >{route.params?.storeInfo.storeName}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center", }}>
                <Icon style={{ justifyContent: 'center', alignItems: 'center' }} name="star" color={"#00C1DE"} size={12} />
                <Text style={{ fontSize: 16, color: 'black', }}>{starAvg}</Text>
              </View>
            </View>

          </View>
        </View>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.7}
        ListFooterComponent={loading ? <ActivityIndicator size={"small"} /> : <></>}
      />
    </SafeAreaView>
  )
}
const MainWrapper = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignContent: 'center',
    // padding: 10,
    // paddingRight: 10,
  },
  ReviewPageHeader: {
    paddingTop: 2,
    paddingBottom: 2,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey'
  },

  ReviewPageHeaderFrame: {
    flexDirection: 'row',
    height: 130,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    shadowColor: '#52006A',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: "center",
  },
  FontText: {
    fontSize: 15,
    fontFamily: 'Apple SD Gothic Neo',
    fontStyle: 'normal',
    letterSpacing: 0.5,
  },

  ContainerBox: {
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    borderColor: 'rgba(0, 0, 0, 0.15)',
    shadowColor: '#52006A',
  }


})
export default ReviewItem;