import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Animated, Dimensions } from 'react-native';
import CountDownClock from './gameComponents/countdown'
import GameClock from './gameComponents/gameClock'
import Barrel from './gameComponents/barrel'
import Banana from './gameComponents/bananaClass'
import ScoreBoard from './gameComponents/scoreBoard'
export default function PlayGame() {

 const [gameStart, setGameStart] = useState(false)
    const [opacity, setOpacity] = useState(new Animated.Value(0))
    const[score, setScore] = useState(0)
    const[dimensions, setDimensions] = useState({
            width: Dimensions.get("screen").width,
            height: Dimensions.get("screen").height
    })
    const onLoad = () => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start()
    }
    const gameFinish = ()=>{
        console.log("finish")
        fetch('http://localhost:3000/gamesubmit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                'score': score,
                'user_id': 1
            })
        })
            .then(res => res.json())
            .then(game => console.log(game))
    }

if (!gameStart){
    return (
        <View>
            <CountDownClock setGameStart = {setGameStart}/>
            <Text>Yo from PlayGame</Text>
        </View>
    )}
    else{
        return(
            <View 
            style={styles.gameBackground}
            >
            <Text>Game Start</Text>
            <GameClock gameFinish = {gameFinish} 
                    onLayout={({ nativeEvent }) => {
                        console.log("clock", nativeEvent)
                    }}   
            />
            <ScoreBoard score = {score}/>
            {/* <Barrel/> */}
            <Banana setScore = {setScore}
            score= {score}
                    style={{width: Dimensions.get("screen").width, height: Dimensions.get("screen").height}}
                />
        </View>)
    }
}



const styles = StyleSheet.create({
gameBackground: {
    flex: 1,
        backgroundColor: '#98DFEA'
}, 



})