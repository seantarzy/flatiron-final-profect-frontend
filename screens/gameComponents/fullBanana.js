import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, PanResponder, Platform, Animated } from 'react-native'


export default function FullBanana(props) {

return (
    <Animated.View >
        <Image source={require('../../assets/banana-peeling/fullbanana.png')} style={styles.banana}/>
    </Animated.View>
)
}

const styles = StyleSheet.create({

    banana: {
        // position: "absolute",
        height: 100,
        width: 100,
        top: 80,
        left: 10
    }

})