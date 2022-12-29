import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { Dimensions, ActivityIndicator } from "react-native";
import OrderResultPopUp from "../../components/Modal/OrderResultPopUp";
import { getDistanceAPI, getOrderSimpleAPI, getOrderFinishAPI } from '../../config/AxiosFunction';
import { DistanceInfo, initialDistanceInfo, initialOrderSmpInfo, OrderSmpInfo, OrderFinishInfo, initialOrderFinishInfo } from '../../models/orderInfo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { OrderInfo } from '../../models/orderInfo';
import CountDownPage from './CountDownPage'
import { useSelector, useDispatch } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import {
    selectMinutesinfo,
    doTimer,
    doEnd
} from '../../slices/time';
import OrderConfirmPopUp from "../../components/Modal/OrderConfirmPopUp";


const width = Dimensions.get('window').width;

type OrderStatusProps = {
    route: any;
    navigation?: any;
}



const OrderStatus = ({ navigation, route }: OrderStatusProps) => {
    const dispatch = useDispatch();

    const t_minutes = useSelector(selectMinutesinfo);

    const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJsZWciLCJpYXQiOjE2NzIyOTQ2MDAsInN1YiI6IjExIiwidG9rZW5UeXBlIjp0cnVlLCJhY2NvdW50VHlwZSI6IlVTRVIiLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9VU0VSIn1dfQ.IrcHhRVSYtyu5txFOhcgF-4oYLlCi7TQd7v5hGPxJaGEJOcOuB1X3jUQR88FU68foc6FMPw_UASxRiBaclkplg'
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [resultOpen, setResultOpen] = useState(false);
    const [distances, setDistances] = useState<DistanceInfo>(initialDistanceInfo);
    const [orderSimple, setOrderSimple] = useState<OrderSmpInfo>(initialOrderSmpInfo);
    const [propData, setPropData] = useState<OrderInfo>(route.params.param);
    const [ready, setReady] = useState<boolean>(true);
    const [orderFinish, setOrderFinish] = useState<OrderFinishInfo>(initialOrderFinishInfo);


    const setTimer = (param: any) => {
        const setTimeParam = {
            t_minutes: param.substr(0, param.indexOf('-'))
        }
        dispatch(doTimer(setTimeParam));
    }
    const theEnd = () => {
        dispatch(doEnd());
    }


    //Modal 관련 
    const openConfirm = () => {
        setConfirmOpen(true);
    }
    const closeConfirm = () => {
        setConfirmOpen(false);
    }
    const openResult = async () => {
        // const response = await getOrderFinishAPI(accessToken, propData.id);
        // setOrderFinish(response.data)

        setConfirmOpen(false);
        setResultOpen(true);
    }
    const closeResult = () => {
        setResultOpen(false)
    }
    const goReview = () => {
        setConfirmOpen(false);
        navigation.navigate('ReviewPage')
    }
    //

    const getActiveLocation = () => {

        Geolocation.getCurrentPosition(
            position => {
                getDistance(position.coords);
            },
            error => {
                console.log(error.code, error.message);
            },
            {
                enableHighAccuracy: true,
                distanceFilter: 0,
            },
        )
    }

    const getDistance = async (param: any) => {
        const response2: any = await getDistanceAPI(accessToken,
            {
                lng: param.longitude,
                lat: param.latitude
            }
            , propData.storeId)
        setDistances(response2.data);

    }

    const getOrderSimple = async () => {
        const response3: any = await getOrderSimpleAPI(accessToken, propData.id);
        setOrderSimple({
            ...response3.data,
            finalPrice: response3.data.finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        })
    }

    useEffect(() => {
        getActiveLocation();
        getOrderSimple();
        setReady(false);
    }, [])

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
                            <CountDownPage mm={t_minutes} onTheEnd={theEnd} setTimer={setTimer} />
                        </Text>
                    </View>
                    <View style={OrderWrapper.Horizontal}>
                        <Text>남은 거리 : {distances.distance}</Text>
                        <TouchableOpacity onPress={getActiveLocation} >
                            <Ionicons name="refresh" size={20} style={{ marginLeft: 5 }} />
                        </TouchableOpacity>
                    </View>
                    <View>
                    </View>
                    <View style={{ margin: 15, height: 160 }}>
                        {/* test */}
                        <ScrollView>
                            <View style={OrderWrapper.ContInfoBox}>
                                <TouchableOpacity style={OrderWrapper.CommentBox}>
                                    <View style={OrderWrapper.Horizontal}>
                                        <Text style={OrderWrapper.FontText}>{propData.orderAt}</Text>
                                    </View>
                                    <View style={OrderWrapper.VerticalN}>
                                        <View style={OrderWrapper.Horizontal}>
                                            <View style={OrderWrapper.CenterAlign}>
                                                <Image
                                                    source={{ uri: propData.storeProfile ? propData.storeProfile : 'none' }}
                                                    style={{
                                                        width: 70,
                                                        height: 70,
                                                        aspectRatio: 1.1,
                                                        resizeMode: 'contain'
                                                    }}
                                                />
                                            </View>
                                            <View
                                                style={[OrderWrapper.VerticalN, {
                                                    marginLeft: 15
                                                }]}>
                                                <View style={OrderWrapper.horizontalN}>
                                                    <Text style={[OrderWrapper.FontText,
                                                    {
                                                        fontSize: 15,
                                                        color: '#000000',
                                                        fontWeight: 'bold'
                                                    }]}>{propData.storeName} </Text>
                                                </View>
                                                <View style={OrderWrapper.horizontalN}>
                                                    <Text style={[OrderWrapper.FontText,
                                                    {
                                                        color: '#000000',
                                                        fontWeight: '500',
                                                    }]}>{propData.simpleMenu}</Text>
                                                </View>
                                                <View style={OrderWrapper.horizontalN}>
                                                    <Text style={[OrderWrapper.FontText,
                                                    {
                                                        color: '#000000',
                                                        fontWeight: '100',
                                                    }]}>
                                                        요청사항 :
                                                    </Text>
                                                    <Text style={[OrderWrapper.FontText,
                                                    {
                                                        color: '#00C1DE',
                                                        fontWeight: 'bold',
                                                        marginLeft: 5
                                                    }]}>
                                                        {orderSimple.requirements}
                                                    </Text>
                                                </View>

                                                <View style={OrderWrapper.horizontalN}>
                                                    <Text style={[OrderWrapper.FontText,
                                                    {
                                                        color: '#000000',
                                                        fontWeight: '100',
                                                    }]}>
                                                        총액:
                                                    </Text>
                                                    <Text style={[OrderWrapper.FontText,
                                                    {
                                                        color: '#000000',
                                                        fontWeight: 'bold',
                                                        marginLeft: 5
                                                    }]}>
                                                        {orderSimple.finalPrice}
                                                    </Text>
                                                    <Text style={[OrderWrapper.FontText,
                                                    {
                                                        color: '#000000',
                                                        fontWeight: '100',
                                                    }]}>
                                                        원
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                    <TouchableOpacity
                        style={OrderWrapper.ActivateButton}
                        onPress={openConfirm}>
                        <Text style={OrderWrapper.ButtonText}>포장받기 완료</Text>
                    </TouchableOpacity>
                </View >}

            <OrderConfirmPopUp
                open={confirmOpen}
                close={closeConfirm}
                title={"포장받기 완료"}
                subTitle={`포장받기 완료처리 하시겠습니까?`}
                openResult={openResult}
            />

            <OrderResultPopUp
                open={resultOpen}
                close={closeResult}
                title={"별점을 선택해주세요"}
                subTitle={"어떠셨나요? :)"}
                go={goReview}
            />

        </SafeAreaView>
    )
}
export const OrderWrapper = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 50
    },
    Horizontal: {
        flexDirection: 'row',
        margin: 10
    },
    Vertical: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    VerticalN: {
        flexDirection: 'column',
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
        marginTop: 1,
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
    ContInfoBox: {
        backgroundColor: 'white',
        borderRadius: 15,
        marginLeft: 8,
        width: width * 0.75,
    },
    CommentBox: {
        backgroundColor: 'rgba(0, 193, 222, 0.12)',
        borderRadius: 15,
        height: 150
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
    horizontalN: {
        flexDirection: "row",
    },
    CenterAlign: {
        justifyContent: "center",
        alignItems: 'center',
    },
    ContentsBox: {
        borderWidth: 1,
        marginTop: 20,
        sborderRadius: 1,
        paddingLeft: 26,
        paddingRight: 26,
        paddingTop: 15,
        paddingBottom: 15,
        borderColor: 'rgba(0, 0, 0, 0.05)',
        backgroundColor: 'white',
    },
    FontText: {
        fontFamily: 'Apple SD Gothic Neo',
        fontStyle: 'normal',
        letterSpacing: 0.5,
    },
    InActivateButton: {
        backgroundColor: '#3E3E3E',
        borderRadius: 10,
        height: 40,
        justifyContent: 'center',
        alignContent: 'center'
    },
});


export default OrderStatus