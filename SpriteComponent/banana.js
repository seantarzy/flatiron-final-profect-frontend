import React, { Component, forwardRef } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Dimensions,
    TouchableHighlight,
    Slider,
    View
    // Sprite 
} from 'react-native';

const Sprite = require('../Sprite.js');

export default function BananaSprite(){
return (
    <View>
        <Sprite style={{ flex: 1, alignSelf: 'stretch', height: 25}}
            imagePath="./banana-peeling"
            ref = {forwardRef("sprite")} 
            format="png"
            count={10}
            duration={1}
            imageNumber={-1}
            animated={false} />
    </View>
)

} 

