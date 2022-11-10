import React, { useCallback, useEffect, useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SignUpAgree from "../components/SignUp/SignUpAgree";
import SignUpPhone from "../components/SignUp/SignUpPhone";


const SignUp = () => {
    const length = 3;
    const [count, setCount] = useState<number>(1); //몇변쨰 슬라이드인지
    const [last, setLast] = useState<boolean>(false); // 마지막 슬라이드인지

    useEffect(() => {
        console.log("count", count);
    }, [count])

    return (
        <SafeAreaView style={SignWrapper.MainContainer}>
            {/* <View style={SignWrapper.Circles} >
                <TouchableOpacity
                    onPress={() => setCount(1)}>
                    <View
                        style={{
                            width: 20,
                            height: 20,
                            borderRadius: 200,
                            borderWidth: 1,
                            borderColor: '#2da6cf',
                            backgroundColor: count === 1 ? '#2da6cf' : 'gray',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={SignWrapper.CircleNumber}>1</Text></View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setCount(2)}>
                    <View
                        style={{
                            width: 20,
                            height: 20,
                            marginLeft: 20,
                            borderRadius: 200,
                            borderWidth: 1,
                            borderColor: '#2da6cf',
                            backgroundColor: count === 2 ? '#2da6cf' : 'gray',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={SignWrapper.CircleNumber}>2</Text></View>
                </TouchableOpacity>

            </View>
            {count === 1 ? <SignUpAgree /> : <SignUpPhone />} */}
        </SafeAreaView >
    )
}
const SignWrapper = StyleSheet.create({
    MainContainer: {
        backgroundColor: 'white',
        flex: 1,
        display: "flex",
        flexDirection: 'column',
        overflow: 'hidden'
    },
    Circles: {
        display: 'flex',
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    CircleNumber: {
        color: 'white',
        fontSize: 10
    }

})
export default SignUp;