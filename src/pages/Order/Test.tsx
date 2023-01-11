import React, { useState, } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/Ionicons';


const AccordionView = (props: any) => {
    const [activeSections, setActiveSections] = useState([])
    const [open, setOpen] = useState<boolean>(false)

    const renderHeader = (section: any) => {
        return (
            <View style={OrderWrapper.horizontal}>
                <Text style={[OrderWrapper.FontText, { fontSize: 20, fontWeight: 'bold', color: 'black', flex: 9 }]}>{section.title}</Text>
                {open == true ?
                    <Icon style={{ flex: 1 }} name="ios-chevron-up-sharp" size={20} />
                    :
                    <Icon style={{ flex: 1 }} name="ios-chevron-down-sharp" size={20} />}
            </View>
        );
    };

    const renderContent = (section: any) => {
        return (
            <SafeAreaView >
                <ScrollView>
                    {/* 상품정보 */}
                    <View style={OrderWrapper.rowElement}>
                        <View style={OrderWrapper.vertical}>
                            {section.productName?.map((item: any, index: number) => {
                                return (
                                    <Text style={OrderWrapper.FontText} key={index}>
                                        {item}
                                    </Text>
                                )
                            })}
                        </View>
                        <View style={OrderWrapper.vertical}>
                            {section.price?.map((item: any, index: number) => {
                                return (
                                    <Text style={OrderWrapper.rightText} key={index}>
                                        {item}
                                    </Text>
                                )
                            })}
                        </View>
                    </View>

                    {/* 총액 */}
                    <View style={OrderWrapper.rowElement}>
                        <View style={OrderWrapper.vertical}>
                            <Text style={[OrderWrapper.FontText, { fontWeight: 'bold', color: 'black' }]}>총 상품 금액</Text>
                        </View>
                        <View style={OrderWrapper.vertical}>
                            <Text style={OrderWrapper.rightText}>{section.fullPrice}</Text>
                        </View>
                    </View>

                    {/* 할인 */}
                    <View style={OrderWrapper.rowElement}>
                        <View style={OrderWrapper.vertical}>
                            <Text style={OrderWrapper.FontText}>할인(쿠폰)</Text>
                            <Text style={OrderWrapper.FontText}>할인(포인트)</Text>
                        </View>
                        <View style={OrderWrapper.vertical}>
                            <Text style={OrderWrapper.rightText}>{section.couponDiscPrice}</Text>
                            <Text style={OrderWrapper.rightText}>{section.pointDiscPrice}</Text>
                        </View>
                    </View>

                    {/* 결제 */}
                    <View style={OrderWrapper.rowElement}>
                        <View style={OrderWrapper.vertical}>
                            <Text style={[OrderWrapper.FontText, { fontWeight: 'bold', color: 'black' }]}>결제금액</Text>
                            <Text style={OrderWrapper.FontText}>결제방식</Text>
                        </View>
                        <View style={OrderWrapper.vertical}>
                            <Text style={[OrderWrapper.rightText, { fontWeight: 'bold', color: 'black' }]}>{section.payAmount}</Text>
                            <Text style={OrderWrapper.rightText}>{section.payMethod}</Text>
                        </View>
                    </View>

                    {/* 주문자정보 */}
                    <View style={OrderWrapper.columnElement}>
                        <Text style={[OrderWrapper.FontText, { fontSize: 15, fontWeight: 'bold', color: 'black' }]}>주문자 정보</Text>
                        <View style={OrderWrapper.horizontal}>
                            <View style={OrderWrapper.vertical}>
                                <Text style={OrderWrapper.FontText}>닉네임</Text>
                                <Text style={OrderWrapper.FontText}>전화번호</Text>
                            </View>
                            <View style={OrderWrapper.vertical}>
                                <Text style={OrderWrapper.rightText}>{section.nickNm}</Text>
                                <Text style={OrderWrapper.rightText}>{section.phoneNumber}</Text>
                            </View>
                        </View>
                    </View>

                    {/* 요청사항 */}
                    <View style={OrderWrapper.rowElement}>
                        <View style={OrderWrapper.vertical}>
                            <Text style={OrderWrapper.FontText}>요청사항</Text>
                        </View>
                        <View style={OrderWrapper.vertical}>
                            <Text style={OrderWrapper.rightText}>{section.customerReq}</Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    };

    //click Event ,전환
    const updateSections = (activeSections: any) => {
        setActiveSections(activeSections);
        setOpen(!open);
    };

    return (
        <Accordion
            // activeSections={[0]}
            // sections={['Section 1', 'Section 2', 'Section 1']}
            sections={props.data}
            expandMultiple={true}
            activeSections={activeSections}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={updateSections}
            sectionContainerStyle={{ marginTop: 20 }}
            underlayColor='rgba(0, 193, 222, 0.12)'

        />
    );
}

export const OrderWrapper = StyleSheet.create({

    FontText: {
        fontFamily: 'Apple SD Gothic Neo',
        fontStyle: 'normal',
        letterSpacing: 1,

    },
    rightText: {
        fontFamily: 'Apple SD Gothic Neo',
        fontStyle: 'normal',
        letterSpacing: 1,
        textAlign: 'right'
    },
    rowElement: {
        flexDirection: 'row',
        padding: 6,
        borderTopWidth: 1.5,
        borderStyle: 'solid',
        borderTopColor: 'rgba(0, 0, 0, 0.25)',
    },
    columnElement: {
        flexDirection: 'column',
        padding: 6,
        borderTopWidth: 1.5,
        borderStyle: 'solid',
        borderTopColor: 'rgba(0, 0, 0, 0.25)',
    },
    vertical: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 2
    },
    horizontal: {
        flexDirection: 'row',
        marginTop: 2
    },





});

export default AccordionView;