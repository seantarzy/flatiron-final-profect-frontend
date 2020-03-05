import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, PanResponder, Platform, Animated, Dimensions } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

export default function BananaPeel(props) {
    // console.log("banana")
    // console.log("transformer", bananaTransform)

    translateX = new Animated.Value(0)
    translateY = new Animated.Value(0)
    // console.log("translation", translateX, translateY)
    handleGesture = Animated.event([{ nativeEvent: { translationX: translateX, translationY: translateY } }], { useNativeDriver: true })





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
    
    let peelImage = <Image source={require('../../assets/banana-peeling/banana-peel.png')} />
    // console.log("peel",Dimensions.get("screen").width)
    // console.log("peel props", props.translator)
    
    const getPeel =(e, peelI)=>{
        e.preventDefault()
        console.log(peelImage)
    }

    
    return (
        
        <Animated.View style={styles.banana}>
            {peelImage}
        </Animated.View>
      
    )
}

const styles = StyleSheet.create({
   
    banana: {
        position: "absolute",
        justifyContent: 'flex-end',
        height: 100,
        width: 100,
        top: 180,
        left: 10
    }

})