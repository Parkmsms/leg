import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, Image, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
import messaging, { firebase } from '@react-native-firebase/messaging';

type HomeProps = {
    navigation: any;
}
interface ILocation {
    latitude: number;
    longitude: number;
}

const Home = ({ navigation }: HomeProps) => {

    const [token, setToken] = useState<string>('');

    const [location, setLocation] = useState<ILocation>({
        latitude: 0,
        longitude: 0
    });
    const handleFcmMessage = () => {
        //푸시를 받으면 호출됨 

        const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {

            Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));

        });



        //알림창을 클릭한 경우 호출됨 

        messaging().onNotificationOpenedApp((remoteMessage) => {

            console.log(

                'Notification caused app to open from background state:',

                remoteMessage.notification,

            );
        });
    };

    const getToken = (async () => {
        messaging().hasPermission().then((enabled: any) => {
            if (enabled) {
                setTimeout(() => {
                    if (!messaging().isDeviceRegisteredForRemoteMessages) {
                        messaging().registerDeviceForRemoteMessages();
                    }
                    messaging().getToken().then((token) => {
                        console.log("messaging token", token);
                        setToken(token);
                    }).catch((error: any) => {
                        console.log("error", error);
                        setToken("device_Token");
                    })
                }, 1000);

            } else {
                //ios 알림 권한 요청
                messaging().requestPermission().then((authStatus: any) => {
                    console.log("AUTHORIZED", messaging.AuthorizationStatus.AUTHORIZED);
                    console.log("PROVISIONAL", messaging.AuthorizationStatus.PROVISIONAL);
                    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
                    if (enabled) {
                        messaging().getToken().then((token: React.SetStateAction<string>) => {
                            //푸시 토큰 표시 
                            console.log('Home Device Token 1st', token);
                            setToken(token);
                            console.log('Authorization status:', authStatus);
                            handleFcmMessage();
                        }).catch((error: any) => {
                            console.log("2nd error", error);

                        })
                    } else {
                        console.log('fcm auth fail');
                    }
                }).catch((err: any) => {
                    console.log('did not get persmisis', err);
                })
            }
        }).catch((error: any) => {
            console.log("final error", error);

        })
        // console.log(enabled);

        //원격 알림에 등록했는지 여부
        // if (!messaging().isDeviceRegisteredForRemoteMessages) {
        //     await messaging().registerDeviceForRemoteMessages();
        // }
        // const token = await messaging().getToken();
        // //푸시 토큰 표시 
        // console.log('Home Device Token 2nd', token);
        // setToken(token);
    });

    const getToken2 = useCallback(async () => {

        try {
            const authStatus = await messaging().requestPermission();
            console.log(authStatus);
            const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED
            console.log(enabled);
            if (enabled) {
                const enabled = await messaging().hasPermission();
                console.log(enabled);

                if (enabled) {
                    setTimeout(() => {
                        if (!messaging().isDeviceRegisteredForRemoteMessages) {
                            messaging().registerDeviceForRemoteMessages();
                        }
                        messaging().getToken().then((token: React.SetStateAction<string>) => {
                            console.log("messagging token", token);
                            setToken(token);
                        }).catch((error: any) => {
                            console.log("1st error", error);
                        })
                    }, 5000);
                } else {
                    console.log('fcm auth fail');

                }
            } else {
                console.log('fcm auth fail');
            }
        } catch {
            console.log("final error");

        }

    }, [token])
    // 토큰 설정    
    useEffect(() => {

        //원격 알림에 등록했는지 여부
        // if (!messaging().isDeviceRegisteredForRemoteMessages) {
        //     await messaging().registerDeviceForRemoteMessages();
        // }
        // const token = await messaging().getToken();
        // //푸시 토큰 표시 
        // console.log('Home Device Token 2nd', token);
        // setToken(token);
        getToken();
    }, []);

    // 현재 위치 사용 권한 설정
    useEffect(() => {
        async function requestLocationPermission() {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("You can use the location")
                } else {
                    console.log("location permission denied")
                }
            } catch (err) {
                console.warn(err)
            }
        }
        requestLocationPermission()
    }, [])

    // 현재 기기 위치 뽑기
    useEffect(() => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
            },
            error => {
                console.log(error.code, error.message);
            },
            {
                enableHighAccuracy: true,
                distanceFilter: 0,
            },
        )
    }, [])

    // useEffect(() => {
    //     if (location) {
    //         console.log("Home Location", location);
    //     }
    // }, [location])

    const goSignUp = () => {
        // DeviceToken이 어떤값인지 조사해볼것
        // console.log("기기 TYPE:", deviceInfo.deviceType);
        navigation.navigate('SignUpAgree', { deviceInfo: token });
    }

    return (
        <>
            <View style={homeWrapper.MainContainer}>
                {/* <Image source={require('../assets/main.png')}
                style={{ width: 100, height: 100 }}></Image> */}
                <Text style={homeWrapper.mainTitle}>지금은 음식 포장하러 가는 중</Text>
                <Image source={require('.././assets/title.png')}
                    style={homeWrapper.headerTitle} />
                <ImageBackground source={require('.././assets/background.png')}
                    style={homeWrapper.background} />
                <View style={homeWrapper.buttonView}>
                    <TouchableOpacity style={homeWrapper.button} onPress={goSignUp}>
                        <Text style={homeWrapper.title} >회원가입</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={homeWrapper.confirmContainer}>
                <Text style={homeWrapper.login}>이미 계정이 있나요?</Text>
                <Text style={homeWrapper.login} onPress={() => navigation.navigate('SignInPhone', { deviceInfo: token })}>로그인</Text>
            </View>
        </>

    )
}
const homeWrapper = StyleSheet.create({
    MainContainer: {
        flex: 8.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    mainTitle: {
        paddingTop: 100,
        paddingBottom: 10,
        fontWeight: '700',
        fontSize: 24
    },
    headerTitle: {
        margin: 15,
        width: '50%'
    },
    background: {
        width: '100%',
        height: '70%'
    },
    buttonView: {
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 40
    },
    button: {
        width: 300,
        height: 50,
        backgroundColor: '#3E3E3E',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        color: 'white',
        fontSize: 20
    },
    confirmContainer: {
        display: 'flex',
        flex: 1.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00C1DE',
    },
    login: {
        paddingBottom: 50,
        paddingLeft: 10,
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 15
    }
})
export default Home;
