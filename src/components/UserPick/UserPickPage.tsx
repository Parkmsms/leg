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
} from 'react-native';
import {
  activeLocation,
  getAccessToken,
  getStoreList,
  getBannerList,
  getFoodKindsList,
} from '../../config/AxiosFunction';
import Icon from 'react-native-vector-icons/Ionicons';

// import DropDownPicker from 'react-native-dropdown-picker';
// import { SafeAreaView } from "react-native-safe-area-context";
// import SliderBox from 'react-native-image-slider-box';
// import Carousel from 'react-native-snap-carousel';
import {Picker} from '@react-native-picker/picker';

const {width} = Dimensions.get('window');
const height = width * 0.6;

type MyLocation = {
  locationId: number;
  userId: number;
  alias: string;
  isActive: boolean;
  address: {
    regionAddress: string;
    roadAddress: string;
    locationName: string;
    depth1: string;
    depth2: string;
    depth3: string;
    detail: string;
    lng: number;
    lat: number;
  };
};

type Store = {
  postId: number;
  postTitle: string;
  cookTimeAvg: number;
  storeName: string;
  storeProfile: string;
  storeStar: string;
  town: string;
  distance: number;
};
type MainPageProps = {
  route: any;
  navigation?: any;
};

type Banner = {
  info: {
    type: 'EVENT' | 'NOTICE';
    id: number;
  };
  title: string;
  image: string;
};

const MainPage = ({navigation, route}: MainPageProps) => {
  const [myLocation, setMyLocation] = useState<MyLocation>();
  // const menuList = ['전체', '한식', '중식', '일식', '분식'];
  const [menuList, setmenuList] = useState<string[]>([]);
  const [bannerList, setBannerList] = useState<Banner[]>([]);
  const [storeList, setStoreList] = useState<Store[]>([]);
  const [active, setActive] = useState<number>(0);

  // const [modalOpen, setModalOpen] = useState(false);
  // const [detaiId, setDetailId] = useState<number>(0);

  // const [filterType, setFiterType] = useState<string>('거리순');
  const [ready, setReady] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [filterList, setFilterList] = useState([
    {label: '거리순', value: '거리'},
    {label: '정렬순', value: '정렬'},
    {label: '별점순', value: '별점'},
  ]);
  const getLocation = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await activeLocation(accessToken);
    setMyLocation(response.data);
  };

  const getBanner = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await getBannerList(accessToken);
    setBannerList(response.data);
  };

  const getFoodsList = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await getFoodKindsList(accessToken);
    setmenuList(response.data);
  };

  const goDetail = (id: number) => {
    console.log(id);
    navigation.navigate('DetailPage', {detailId: id});
  };

  return (
    <ScrollView style={MainWrapper.MainContainer}>
      {ready ? (
        <View style={[MainWrapper.container, MainWrapper.horizontal]}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <View style={MainWrapper.ListWrapper}>
            <ScrollView>
              {storeList?.map((store: Store, index: number) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => goDetail(store.postId)}
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
        </>
      )}
    </ScrollView>
  );
};
const MainWrapper = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignContent: 'center',
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
    color: 'white',
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
    paddingTop: 10,
    flex: 4,
  },
});
export default MainPage;
