import CountDown from 'react-native-countdown-component';
import React, { useState, useEffect, Component } from 'react'
import { View, Text, Image, StyleSheet, PanResponder, Platform, Animated } from 'react-native'

export default function Barrel (props) {

    const [xPosition, setXposition] = useState(5)
    const [yPosition, setYposition] = useState(1)
    
return(

<Animated.View>
    
<Animated.Image source={require('../../assets/barrel.png')}
style = {styles.image}
/>
 </Animated.View>
)
}
const styles = StyleSheet.create({
image: {
    width: 50,
    height: 80,
    position: 'absolute'
}
})