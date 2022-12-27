import React, {useState, useEffect, useRef} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  VirtualizedList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {
  activeLocation,
  getAccessToken,
  getStoreList,
  getBannerList,
  getFoodKindsList,
} from '../../../config/AxiosFunction';
import Icon from 'react-native-vector-icons/Ionicons';
import {intialStorePrams, StoreParams} from '../../../models/listfilterInfo';
import {Picker} from '@react-native-picker/picker';

type Store = {
  id: number;
  postTitle: string;
  cookTimeAvg: number;
  storeName: string;
  storeProfile: string;
  storeStar: string;
  town: string;
  distance: number;
  foodTypes: string[];
};
type MainPageProps = {
  route: any;
  navigation?: any;
};

const MainPage = ({navigation, route}: MainPageProps) => {
  const [menuList, setmenuList] = useState<string[]>([]);

  const [storeList, setStoreList] = useState<Store[]>([]);
  const [active, setActive] = useState<number>(0);
  const [params, setParams] = useState<StoreParams>(intialStorePrams);

  const [ready, setReady] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [filterList, setFilterList] = useState([
    {label: '거리순', value: '거리'},
    {label: '정렬순', value: '정렬'},
    {label: '별점순', value: '별점'},
  ]);

  const getList = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await getStoreList(accessToken, params);
    console.log('가게정보', response.data.content);
    setStoreList(response.data.content);
  };

  const getFoodsList = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await getFoodKindsList(accessToken);
    setmenuList(response.data);
  };

  useEffect(() => {
    console.log('메인페이지 검색어', route.params?.menu);
    if (route.params?.menu) {
      setParams({
        ...params,
        keyword: route.params?.menu,
      });
    }
    console.log('음식종류: ', menuList);
    console.log('선택한 음식 종류: ', params.foodType);
    console.log('검색 params', params);
    setTimeout(() => {
      getList();
      getFoodsList();
      setReady(false);
    }, 2000);
  }, [params, route.params?.menu]);

  const goDetail = (id: number, profile: string) => {
    console.log(id);
    console.log(profile);
    navigation.navigate('DetailPage', {detailId: id, profile: profile});
  };

  const setMenu = (e: string) => {
    console.log(e);
    setParams({
      ...params,
      foodType: e,
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {ready ? (
        <View style={[MainWrapper.container, MainWrapper.horizontal]}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={MainWrapper.MainContainer}>
          <ScrollView>
            <View style={MainWrapper.ListWrapper}>
              <ScrollView>
                {storeList?.map((store: Store, index: number) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => goDetail(store.id, store.storeProfile)}
                      // onPress={() => openModal(store.postId)}
                      style={{
                        flexDirection: 'row',
                        borderWidth: 2,
                        borderRadius: 20,
                        // borderBottomColor: 'rgba(0, 0, 0, 0.12)',
                        marginBottom: 10,
                        width: 360,
                        height: 160,
                        borderColor: 'rgba(0, 0, 0, 0.05)',
                        paddingLeft: 10,
                        paddingTop: 15,
                        shadowColor: '#52006A',
                        backgroundColor: 'white',
                        elevation: 5,
                      }}>
                      <Image
                        source={{uri: store.storeProfile}}
                        style={{
                          borderRadius: 20,
                          width: 120,
                          height: 120,
                        }}
                      />
                      <View
                        style={{
                          flexDirection: 'column',
                          paddingLeft: 15,
                        }}>
                        <Text
                          style={{
                            width: 190,
                            fontSize: 15,
                            fontWeight: 'bold',
                            marginBottom: 10,
                            color: 'black',
                          }}>
                          {store.postTitle}
                        </Text>
                        <Text
                          style={{
                            color: 'black',
                            marginBottom: 10,
                          }}>
                          평균 조리시간 {store.cookTimeAvg}분
                        </Text>
                        <Text
                          style={{
                            fontWeight: '400',
                            marginBottom: 10,
                          }}>
                          {store.town} {store.distance}m
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={{marginRight: 10, color: 'black'}}>
                              {store.storeName}
                            </Text>
                            <View style={{flexDirection: 'row'}}>
                              <Icon
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                                name="star"
                                color={'#00C1DE'}
                                size={18}
                              />
                              <Text style={{fontSize: 15}}>
                                {store.storeStar}
                              </Text>
                            </View>
                          </View>
                          {/* <Icon name="bookmark-outline" size={18} /> */}
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};
const MainWrapper = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'background-color: rgba(0, 0, 0, 0.01)',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
    // alignContent: 'center',
    // padding: 10,
    paddingLeft: 10,
    // paddingRight: 10,
  },
  HeadeWrapper: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderBottomWidth: 1,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    // borderLeftWidth: 3,
    // borderRightWidth: 3,
    // borderBottomColor: 'rgba(0, 0, 0, 0.5)',
    // borderColor: 'rgba(0, 0, 0, 0.5)',
    // shadowColor: '#52006A',
    backgroundColor: 'white',
  },
  location: {
    fontSize: 15,
    color: 'black',
  },
  BannerWrapper: {
    paddingTop: 30,
    paddingRight: 20,
  },
  BannerPaging: {
    color: '#888',
    margin: 3,
  },
  BannerPagingActive: {
    color: '#00C1DE',
    margin: 3,
  },
  Horizon: {
    width: '100%',
    textAlign: 'center',
    borderBottomColor: 'green',
    // borderBottomWidth: 1,
    lineHeight: 1,
    margin: 10,
  },
  TagWrapper: {
    paddingTop: 10,
    // flex: 1,
    flexDirection: 'row',
  },
  menutag: {
    width: 70,
    height: 30,
    backgroundColor: '#E8E8E8',
    // backgroundColor: 'rgba(27, 147, 234, 0.93)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 3,
  },
  menutext: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
    paddingLeft: 5,
    paddingRight: 5,
  },
  ListHeaderWrapper: {
    width: 350,
    paddingTop: 10,
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    color: 'black',
    fontSize: 25,
    fontWeight: '800',
  },
  filter: {
    color: 'black',
  },
  ListWrapper: {
    paddingTop: 60,
    flex: 4,
  },
});
export default MainPage;
