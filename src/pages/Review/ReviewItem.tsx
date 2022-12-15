import React, {useRef,useEffect,useState} from 'react';
import { Alert, Image, Modal, StyleSheet, Text, Button, TouchableOpacity, View ,FlatList,SafeAreaView,ListRenderItemInfo ,ActivityIndicator} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

type ReviewItem = {
  navigation?: any,
  route: any
}
const ReviewItem = ({ navigation, route }: ReviewItem) => {
    const LIMIT = 10;
    // const [reveiwInfo, setReviewInfo] = useState<Review>({
    //         StoreId : 0,
    //         //상품고유코드 PK
    //         itemCd : "",    
    //         //상품평점 평균
    //         itemStarAvg : 0,
    //         content: [
    //             {
    //             //순서
    //             reviewOrder : "",
    //             //별
    //             reviewStar : 0,
    //             //상품명
    //             itemName : "",
    //             //닉네임
    //             userNickNm : "",
    //             //리뷰텍스트
    //             reviewText : "",
    //             //이미지첨부
    //             postImage : "",
    //             //작성날짜
    //             reviewDate : "",
    //             //리뷰답글
    //             reviewReply : []
    //             }
    //         ]
    //     }
    // );

    // const [ready, setReady] = useState<boolean>(true);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [offset, setOffset] = useState<number>(0);

    // const page = useRef(1);

    const renderItem = ({ item } : ListRenderItemInfo<any>) => {
        return (
          <View style={{
            paddingLeft:10,
            paddingRight:10
          }}>
            {/* 프로필,이름,별점,등록날짜 */}
            <View >
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1, alignItems:'center'}}>
                        <Image source={require('../../assets/banner.png')}
                        style={{width:36, height:36, borderRadius:37.5}}/>
                    </View>
                    <View style={{flex:7}}>
                        <View style={{flexDirection:'row', }}>
                            <View >
                                <Text style={{fontSize:16, fontWeight:'bold'}}>응암동람머스</Text>
                                <View style={{ flexDirection: 'row',marginLeft:1}}>
                                    <Icon style={{ justifyContent: 'center', alignItems: 'center' }} name="star" color={"#00C1DE"} size={12} />
                                    <Icon style={{ justifyContent: 'center', alignItems: 'center' }} name="star" color={"#00C1DE"} size={12} />
                                    <Icon style={{ justifyContent: 'center', alignItems: 'center' }} name="star" color={"#00C1DE"} size={12} />
                                    <Icon style={{ justifyContent: 'center', alignItems: 'center' }} name="star" color={"#00C1DE"} size={12} />
                                    <Icon style={{ justifyContent: 'center', alignItems: 'center' }} name="star" color={"#00C1DE"} size={12} />
                                    <Text style={{fontSize:11, marginLeft:3}}>어제</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            {/* 사진,리뷰내용 */}
            <View style={{flex:1, alignItems:'center'}}>
                <Image
                style={{
                    width: 350, height:330 ,resizeMode: 'contain', overflow: 'hidden'
                  }} 
                source={require('../../assets/main.png')}/>
            </View>
            <View>
              <Text>id:{item.id}</Text>
              <Text>{item.body}</Text>
            </View>
            
            {/* 태그 * TODO => 태그 갯수만큼 TTouchableOpacity map 렌더링 */}
            <View style={{flexDirection:'row' }}>
                <TouchableOpacity>
                    <View style={{ alignItems: 'baseline'}}>
                        <View style={{
                            backgroundColor: '#f3f3f3',
                            borderRadius: 30,
                            marginTop:3,
                            marginLeft:3,
                            padding:3,
                            alignItems:'baseline',
                            flexDirection:'row'
                        }}>
                            <Text style={{color:"#00C1DE",fontSize:10}}>#연어소바</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{ alignItems: 'baseline'}}>
                        <View style={{
                            backgroundColor: '#f3f3f3',
                            borderRadius: 30,
                            marginTop:3,
                            marginLeft:3,
                            padding:3,
                            alignItems:'baseline',
                            flexDirection:'row'
                        }}>
                            <Text style={{color:"#00C1DE",fontSize:10}}>#일식</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            {/* 사장님답글 TOBE => 사장님답글 Y/N verify => 렌더링*/}
            <View 
                style={{
                    marginTop:20,
                    marginBottom:20,
                    borderWidth: 1,
                    borderRadius: 20,
                    padding:10,
                    width: 360,
                    height: 130,
                    borderColor: 'rgba(0, 0, 0, 0.05)',
                    shadowColor: '#52006A',
                    backgroundColor: '#f1fcfd',
                }}>
                <View style={{flexDirection:'row', }}>
                    <View >
                        <View style={{ flexDirection: 'row',marginLeft:1}}>
                            <Text style={{fontSize:10, fontWeight:'bold',color:'black'}}>사장님</Text>
                            <Text style={{fontSize:10, marginLeft:3}}>어제</Text>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:10, color:'black'}}>
                        안녕하세요 람모스나 , 미쁘동 앞으로도 맣ㄴ이 사랑해주세요 맛있게 드셨다니! 앞으로도 더 노력하는 미쁘동 되겠습니당
                    </Text>
                </View>
            </View>
          </View>
        );
      };


    const getData =   () => {
        setLoading(true);
        fetch("http://jsonplaceholder.typicode.com/posts")
          .then((res) => res.json())
          .then((res) => setData(data.concat(res.slice(offset, offset + LIMIT))))
          .then(() => {
            setOffset(offset + LIMIT);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            Alert.alert("에러가 났습니다");
          });
      };

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
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center", }}>
                            <Icon style={{ justifyContent: 'center', alignItems: 'center' }} name="star" color={"#00C1DE"} size={12} />
                            <Icon style={{ justifyContent: 'center', alignItems: 'center' }} name="star" color={"#00C1DE"} size={12} />
                            <Icon style={{ justifyContent: 'center', alignItems: 'center' }} name="star" color={"#00C1DE"} size={12} />
                            <Icon style={{ justifyContent: 'center', alignItems: 'center' }} name="star" color={"#00C1DE"} size={12} />
                            <Icon style={{ justifyContent: 'center', alignItems: 'center' }} name="star" color={"#00C1DE"} size={12} />
                        </View>
                      </View>
                      <Text style={{
                        fontSize:16,
                        color: 'black',
                      }}>미쁘동 5.0점</Text>
                    </View>
                </View>
            </View>
          
            <FlatList 
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => String(item.id)}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.7}
                ListFooterComponent={loading?<ActivityIndicator size={"large"}/>:<></>}
            />
        </SafeAreaView>
    )
}
const MainWrapper = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center"
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
      paddingLeft:15,
      paddingRight:15,
      // padding: 10,
      // paddingRight: 10,
    },
    ReviewPageHeader: {
      width: '100%',
      paddingTop: 2,
      paddingBottom: 2,
      flexDirection: "row",
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },

    ReviewPageHeaderFrame:{
      flexDirection: 'row',
      width: 360,
      height: 130,
      borderColor: 'rgba(0, 0, 0, 0.05)',
      shadowColor: '#52006A',
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: "center",
    }
    
    
  })
export default ReviewItem;