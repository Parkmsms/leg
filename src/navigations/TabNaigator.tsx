import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Home from '../pages/Home';
import Orders from '../pages/Orders';
import MyPage from '../pages/MyPage';
import MainPage from '../pages/MainPage';
import OrderStatus from '../pages/Order/OrderStatus';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderPage from '../pages/OrderPage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="홈"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName = Platform.OS === 'ios' ? 'ios-' : 'md-';

          if (route.name === '홈') {
            iconName += 'home-outline';
          } else if (route.name === '주문내역') {
            iconName += 'newspaper-outline';
          } else if (route.name === '마이 페이지') {
            iconName += 'person-outline';
          }
          return (
            <Ionicons
              name={iconName}
              color={focused ? '#00C1DE' : 'black'}
              style={{
                fontWeight: 'bold',
                backgroundColor: 'white',
                fontSize: 35,
                fontStyle: 'italic',
              }}
              size={50}
            />
          );
        },
        tabBarShowLabel: true,
        // tabBarActiveBackgroundColor: "#ff7f00",
        // tabBarInactiveBackgroundColor: 'gray',
        headerTitleStyle: {
          fontSize: 50,
        },
        tabBarStyle: {
          backgroundColor: '#ffff',
          // borderTopColor: '#ff7f00',
          justifyContent: 'center',
          alignItems: 'center',
          height: 80,
          fontSize: 30,
          paddingBottom: 20,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          // borderLeftColor: 'black'
        },
      })}>
      <Tab.Screen
        name="홈"
        component={MainPage}
        options={{ headerShown: false }}
      // options={{
      //   title: '주소 확인',
      //   headerTitleAlign: 'center',
      //   headerTitleStyle: {
      //     fontSize: 20,
      //     fontWeight: 'bold',
      //   }
      // }}
      />
      <Tab.Screen name="주문내역"
        component={OrderPage}
        // options={({navigation})=> ({
        //    tabBarButton:props => <TouchableOpacity {...props} onPress={()=>navigation.goBack()}/>
        // })}
        options={{
          title: '주문내역',
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerTintColor: '#000000',
          headerStyle: {
            backgroundColor: '#F9FFFF',
          },
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: 'Urbanist',
            fontWeight: 'bold',

            // marginTop:10
          },
        }}
      />
      {/* <Tab.Screen name="내 근처" component={Delivery} /> */}
      <Tab.Screen
        name="마이 페이지"
        component={MyPage}
        options={{
          title: '마이 페이지',
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerTintColor: '#000000',
          headerStyle: {
            backgroundColor: '#F9FFFF',
          },
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: 'Urbanist',
            fontWeight: 'bold',

            // marginTop:10
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
