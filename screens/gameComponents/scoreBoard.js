import React, { useState } from 'react'
import { View, Text } from 'react-native'

export default function ScoreBoard(props) {
    return (
    <View>
        <Text>Score:</Text>
        <Text>{props.score}</Text>
    </View>
            
        
    )
}
