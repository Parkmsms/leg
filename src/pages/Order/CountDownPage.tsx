import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import {
  selectMinutesinfo,
  selectSecondsinfo
} from '../../slices/time';
import { Text, View, StyleSheet, StatusBar, Alert, Button, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Orders = (props: any) => {
  const [minutes, setMinutes] = useState(parseInt(props.mm));
  const [seconds, setSeconds] = useState(parseInt(props.ss));

  const t_minutes = useSelector(selectMinutesinfo);
  const t_seconds = useSelector(selectSecondsinfo);
  useEffect(() => {
    const countdown = setInterval(() => {
      if ((seconds) > 0) {
        setSeconds((seconds) - 1);
      }
      if ((seconds) === 0) {
        if ((minutes) === 0) {
          clearInterval(countdown);
        } else {
          setMinutes((minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);


    // 0분 0초 일시 상품완료상태 변경
    if (minutes === 0 && seconds === 0) {
      props.onTheEnd()
    } else {
      props.setTimer(minutes + `-` + seconds)
    }
    return () => clearInterval(countdown);
  },);

  const extensionFive = () => {

    if (minutes >= 55 && seconds >= 0) {
      Alert.alert("60분 이상으로는 연장불가능합니다.")
      setMinutes(60)
      setSeconds(0)
      return false
    }
    setMinutes(minutes + 5)
    setSeconds(seconds)
  }

  return (
    <>
      {t_minutes >= 5 && <Text> {t_minutes}:{t_seconds < 10 ? `0${t_seconds}` : t_seconds}</Text>}
      {t_minutes < 5 && <Text style={{ color: 'red' }}> {t_minutes}:{t_seconds < 10 ? `0${t_seconds}` : t_seconds}</Text>}
      {/* {t_minutes >= 5 ? <Text> {t_minutes}</Text> : <Text style={{ color: 'red' }}> {t_minutes}</Text>} */}
      <TouchableOpacity onPress={extensionFive} >
        <Ionicons name="refresh" size={20} style={{ marginLeft: 5 }} />
      </TouchableOpacity>
    </>
  )
}
export default Orders;