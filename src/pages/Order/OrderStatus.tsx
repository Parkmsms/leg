import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Button,
    ScrollView,
    Alert
} from 'react-native';
import { Dimensions, ActivityIndicator } from "react-native";
import OrderPopUp from "../../components/Modal/OrderPopUp";
import { activeLocation, getDistanceAPI } from '../../config/AxiosFunction';
import { MyLocation, initialMyLocation } from '../../models/locationInfo';
import { DistanceInfo, initialDistanceInfo } from '../../models/orderInfo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CountDownPage from './CountDownPage'
import { useSelector, useDispatch } from 'react-redux';
import {
    selectMinutesinfo,
    selectSecondsinfo,
    doTimer,
    doEnd
} from '../../slices/time';


const width = Dimensions.get('window').width;

type OrderStatusProps = {
    route: any;
    navigation?: any;
}


const OrderStatus = ({ navigation, route }: OrderStatusProps) => {
    const dispatch = useDispatch();

    const t_minutes = useSelector(selectMinutesinfo);
    const t_seconds = useSelector(selectSecondsinfo);

    const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJsZWciLCJpYXQiOjE2NzE0MTA4NzEsInN1YiI6IjEwMTYiLCJ0b2tlblR5cGUiOnRydWUsImFjY291bnRUeXBlIjoiVVNFUiIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJST0xFX1VTRVIifV19.U-FmO73zLO6mm2Mt5QPN3NLIXfHwom7xmeoamhCA4wjRoOO6dqm36uj0G5x-1QhKzXOtdBaT0ThIef8SmP7usA'
    const [modalOpen, setModalOpen] = useState(false);
    const [location, setLocation] = useState<MyLocation>(initialMyLocation);
    const [distances, setDistances] = useState<DistanceInfo>(initialDistanceInfo);
    const [ready, setReady] = useState<boolean>(true);

    const setTimer123 = (param: any) => {
        const param2 = {
            t_seconds: param.substr(param.indexOf('-') + 1),
            t_minutes: param.substr(0, param.indexOf('-'))
        }
        dispatch(doTimer(param2));
    }
    const theEnd = (param: any) => {
        dispatch(doEnd());
    }


    const closeModal = () => {
        setModalOpen(false);
    }
    const openModal = () => {
        setModalOpen(true);
    }

    const goReview = () => {
        setModalOpen(false);
        navigation.navigate('ReviewPage')
    }

    const getActiveLocation = async () => {
        const response1: any = await activeLocation(accessToken);
        setLocation((current) => {
            let newCondition = { ...current };
            newCondition = response1.data;
            return newCondition;
        });
        setLocation(response1.data);
        //setLocation 의 location 값으로 parameter설정시 비동기이기 때문에 (initialMyLocation)빈값으로 설정됌.. 
        //response 데이터 자체를 param으로 설정
        const response2: any = await getDistanceAPI(accessToken,
            {
                lng: response1.data.address.lng,
                lat: response1.data.address.lat
            }
            , route.params.orderId)
        setDistances(response2.data);

        setReady(false);
    }

    useEffect(() => {
        getActiveLocation();
    }, [ready])

    return (
        <SafeAreaView style={OrderWrapper.MainContainer}>
            {ready ?
                <View style={[OrderWrapper.container, OrderWrapper.horizontal]}>
                    <ActivityIndicator size="large" />
                </View>
                :
                <View style={OrderWrapper.Vertical}>
                    <Text style={OrderWrapper.FontStatus}>픽업 대기중입니다🍽</Text>
                    <Image source={require('../../assets/location.png')}
                        style={{
                            width: 180,
                            height: 180,
                            padding: 30,
                            justifyContent: "center",
                            alignItems: 'center',
                            borderRadius: 20,
                        }} />
                    <View style={OrderWrapper.Horizontal}>
                        <Text style={OrderWrapper.FontMinute}>픽업예정 시간:</Text>
                        <Text style={OrderWrapper.FontTime}>
                            <CountDownPage mm={t_minutes} ss={t_seconds} onTheEnd={theEnd} setTimer={setTimer123} />
                        </Text>
                    </View>
                    <View>

                    </View>
                    <View style={{ margin: 15, height: 150 }}>
                        <ScrollView>
                            <TouchableOpacity style={OrderWrapper.CommentBox}>
                                <Text style={OrderWrapper.FontColor}>{location.address.locationName}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={OrderWrapper.CommentBox}>
                                <Text style={OrderWrapper.FontColor}>거리 : {distances.distance}</Text>

                            </TouchableOpacity>
                            <TouchableOpacity style={OrderWrapper.CommentBox}>
                                <Text style={OrderWrapper.FontColor}>사장 </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={OrderWrapper.CommentBox}>
                                <Text style={OrderWrapper.FontColor}>사장 </Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                    <TouchableOpacity
                        style={OrderWrapper.ActivateButton}
                        onPress={openModal}
                    >
                        <Text style={OrderWrapper.ButtonText}>포장받기 완료</Text>
                    </TouchableOpacity>
                </View >}
            <OrderPopUp
                open={modalOpen}
                close={closeModal}
                title={"별점을 선택해주세요"}
                subTitle={"어떠셨나요? :)"}
                onTouchOutSide={closeModal}
                go={goReview}
            />
        </SafeAreaView>
    )
}
export const OrderWrapper = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: 'white',
        width: width,
        height: width * 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    Horizontal: {
        flexDirection: 'row',
        margin: 10
    },
    Vertical: {
        marginTop: 50,
        flexDirection: 'column',
        alignItems: 'center',
    },
    ActivateButton: {
        backgroundColor: '#00C1DE',
        borderRadius: 12,
        height: 54,
        justifyContent: 'center',
        alignContent: 'center',
        width: width * 0.8
    },
    ButtonText: {
        fontSize: 20,
        fontFamily: 'Urbanist',
        fontStyle: 'normal',
        fontWeight: 'bold',
        color: '#FFFFFF',
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },
    FontStatus: {
        fontFamily: 'Apple SD Gothic Neo',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 24,
        alignItems: 'center',
        color: '#000000'
    },
    FontMinute: {
        color: '#000000',
        fontSize: 20,
        fontFamily: 'Urbanist',
        fontStyle: 'normal',
        fontWeight: '800',
        marginTop:1,
    },
    FontTime: {
        color: '#00C1DE',
        fontSize: 20,
        fontFamily: 'Urbanist',
        fontStyle: 'normal',
        fontWeight: '800',
    },
    FontColor: {
        fontFamily: 'Apple SD Gothic Neo',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 15,
        letterSpacing: 0.2,
        color: '#00C1DE'
    },
    CommentBox: {
        backgroundColor: 'rgba(0, 193, 222, 0.12)',
        borderRadius: 15,
        marginTop: 8,
        marginLeft: 8,
        padding: 10,
        width: width * 0.75
    },
    container: {
        flex: 1,
        justifyContent: "center",
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
});


export default OrderStatus