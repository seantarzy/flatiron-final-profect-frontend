import CountDown from 'react-native-countdown-component';
 import React, {useState} from 'react'
 import {View, Text} from 'react-native'

export default function CountDownClock(props){
  
    return (
      <CountDown
        until={3}
        onFinish={() => props.setGameStart(true)}
        size={50}
        onPress={() => alert('hello')}
        timeToShow={['S']}
        digitStyle={{ backgroundColor: '#FFF' }}
        digitTxtStyle={{ color: '#1CC625' }}
        size={20}
      />
    )
}