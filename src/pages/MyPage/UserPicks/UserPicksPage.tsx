import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import {getAccessToken, UserPicksAPI} from '../../../config/AxiosFunction';
import Icon from 'react-native-vector-icons/Ionicons';
import {intialStorePrams, StoreParams} from '../../../models/listfilterInfo';

/* UserPicks Data */
type UserPicksData = {
  id: number;
  postId: number;
  postTitle: string;
  storeName: string;
  storeProfile: string;
};

type UserPicksNavigator = {
  navigation?: any;
  route?: any;
};

const MainPage = ({navigation, route}: UserPicksNavigator) => {
  const [picks, setPicks] = useState<UserPicksData[]>([]);

  const getUserPicks = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await UserPicksAPI(accessToken);
    setPicks(response.data.content);
    console.log('유저픽', response.data.content);
  };

  useEffect(() => {
    getUserPicks();
    console.log('유저픽스 리스트:', picks);
  }, []);

  const goDetail = (id: number, profile: string) => {
    console.log(id);
    console.log(profile);
    navigation.navigate('DetailPage', {detailId: id, profile: profile});
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={MainWrapper.MainContainer}>
        <ScrollView>
          <View style={MainWrapper.ListWrapper}>
            <ScrollView>
              {picks?.map((picks: UserPicksData, index: number) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => goDetail(picks.id, picks.storeProfile)}
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
                      source={{uri: picks.storeProfile}}
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
                          fontSize: 16,
                          fontWeight: 'bold',
                          marginTop: 30,
                          color: 'black',
                        }}>
                        {picks.postTitle}
                      </Text>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              marginRight: 10,
                              marginTop: 10,
                              color: 'black',
                            }}>
                            {picks.storeName}
                          </Text>
                          <View style={{flexDirection: 'row'}}></View>
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
