import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import {
  selectMinutesinfo,
} from '../../slices/time';
import { Text, View, StyleSheet, StatusBar, Alert, Button, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Orders = (props: any) => {
  const [minutes, setMinutes] = useState(parseInt(props.mm));
  // const [seconds, setSeconds] = useState(parseInt(props.ss));

  const t_minutes = useSelector(selectMinutesinfo);
  // const t_seconds = useSelector(selectSecondsinfo);
  useEffect(() => {
    const countdown = setInterval(() => {
      if ((minutes) !== 0) {
        setMinutes((minutes) - 1);
      } else {
        clearInterval(countdown);
      }
    }, 60000);


    // 0분 0초 일시 상품완료상태 변경
    if (minutes === 0) {
      props.onTheEnd()
    } else {
      props.setTimer(minutes + `-`)
    }
    return () => clearInterval(countdown);
  },);

  const extensionFive = () => {

    if (minutes >= 55) {
      Alert.alert("60분 이상으로는 연장불가능합니다.")
      setMinutes(60)
      return false
    }
    setMinutes(minutes + 5)
  }

  return (
    <>
      {t_minutes >= 5 && <Text> {t_minutes} 분</Text>}
      {t_minutes < 5 && <Text style={{ color: 'red' }}> {t_minutes} 분</Text>}
      {/* {t_minutes >= 5 ? <Text> {t_minutes}</Text> : <Text style={{ color: 'red' }}> {t_minutes}</Text>} */}
      <TouchableOpacity onPress={extensionFive} >
        <Ionicons name="refresh" size={20} style={{ marginLeft: 5 }} />
      </TouchableOpacity>
    </>
  )
}
export default Orders;