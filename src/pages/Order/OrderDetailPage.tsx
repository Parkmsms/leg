import React from 'react';

import { View, StyleSheet, Dimensions, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Test from './Test'
const width = Dimensions.get('window').width;

const SECTIONS = [
    {
        title: '카드 영수증 보기',
        productName: ['닭다리 샐러드', '(토핑)계란 추가', '(토핑)야채 추가', '발사믹 소스'],
        price: [10500, 1000, 2000, 500],
        fullPrice: 72000,
        couponDiscPrice: 0,
        pointDiscPrice: 2000,
        payAmount: 12000,
        payMethod: '카카오페이',
        nickNm: '응암동라모스',
        phoneNumber: '010-7250-3229',
        customerReq: '양좀 더주세요'
    }
];

const OrderDetailPage = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
                <View style={OrderWrapper.MainContainer}>
                    <View style={OrderWrapper.ContentsBox}>
                        <Text style={[OrderWrapper.FontText, { fontSize: 20, fontWeight: 'bold', color: 'black' }]}>주문의 상태</Text>
                        <TouchableOpacity><Text style={[OrderWrapper.FontText, { fontSize: 15, fontWeight: '600', marginTop: 5 }]}>샐러디 남부터미널점</Text></TouchableOpacity>
                        <Text style={[OrderWrapper.FontText, { fontSize: 20, fontWeight: 'bold', color: 'black', marginTop: 20 }]}>주문 내역</Text>
                        <Text style={[OrderWrapper.FontText, { fontSize: 15, fontWeight: '600', marginTop: 5 }]}>주문 일시 : 2023.01.09.. </Text>
                        <Text style={[OrderWrapper.FontText, { fontSize: 15, fontWeight: '600', marginTop: 5 }]}>주문 번호 : LZDF!fsgsd2GDSd</Text>
                        <Test data={SECTIONS} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export const OrderWrapper = StyleSheet.create({
    MainContainer: {
        marginTop: 30,
        justifyContent: "center",
        alignItems: 'center',
    },

    ContentsBox: {
        borderBottomWidth: 1,
        width: width * 0.92,
        marginTop: 20,
        sborderRadius: 1,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: 'rgba(0, 0, 0, 0.25)',
        backgroundColor: 'white',
    },
    Vertical: {
        flexDirection: 'column'
    },
    Horizontal: {
        flexDirection: 'row'
    },
    ActivateButton: {
        backgroundColor: '#00C1DE',
        borderRadius: 10,
        height: 40,
        justifyContent: 'center',
        alignContent: 'center',
        margin: 5,
        flex: 2
    },
    InActivateButton: {
        backgroundColor: '#3E3E3E',
        borderRadius: 10,
        height: 40,
        justifyContent: 'center',
        alignContent: 'center'
    },
    ButtonText: {
        fontSize: 17,
        fontFamily: 'Urbanist',
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },
    FontText: {
        fontFamily: 'Apple SD Gothic Neo',
        fontStyle: 'normal',
        letterSpacing: 0.5,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'background-color: rgba(0, 0, 0, 0.01)'
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },

    StatusButton: {
        backgroundColor: '#3E3E3E',
        borderRadius: 8,
        width: 22,
        justifyContent: 'center',
        alignContent: 'center'
    },
    StatusText: {
        fontSize: 16,
        fontFamily: 'Urbanist',
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },

    AddPhotoButtonText: {
        fontSize: 17,
        fontFamily: 'Apple SD Gothic Neo',
        fontStyle: 'normal',
        fontWeight: 'bold',
        color: '#00C1DE',
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },

    AddPhotoButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1.5,
        borderStyle: 'solid',
        borderColor: '#00C1DE',
        borderRadius: 10,
        height: 40,
        justifyContent: 'center',
        alignContent: 'center',
        margin: 5,
        flex: 2
    },

});

export default OrderDetailPage;