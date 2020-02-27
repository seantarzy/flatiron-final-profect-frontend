import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, PanResponder, Platform, Animated } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'

export default function BananaPeel(props) {
    // console.log("banana")
    // console.log("transformer", bananaTransform)
    translateX = new Animated.Value(0)
    translateY = new Animated.Value(0)
    // console.log("translation", translateX, translateY)
    handleGesture = Animated.event([{ nativeEvent: { translationX: translateX, translationY: translateY } }], { useNativeDriver: true }, console.log("yo"))
;
    let bananaTransform = {
        transform: [
            {
                translateY: translateY
            },
            {
                translateX: translateX
            }
        ]
    }

    let peelImage = <Image source={require('../../assets/banana-peeling/banana-peel.png')} style={styles.banana} />

// console.log("peel props", props.translator)
    return (
        
        <PanGestureHandler onGestureEvent={handleGesture}>
        <Animated.View style = {bananaTransform}>
            {peelImage}
        </Animated.View>
        </PanGestureHandler>
      
    )
}

const styles = StyleSheet.create({
   
    banana: {
        // position: "absolute",
        justifyContent: 'flex-end',
        height: 100,
        width: 100,
        top: 80,
        left: 10
    }

})