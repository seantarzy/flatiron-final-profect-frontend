import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, } from 'react-native';

export default function Leaderboard() {
    const [allgames, setAllGames] = useState([])
useEffect(()=>{
    fetch('http://localhost:3000/games')
        .then(res => res.json())
        .then(games => {
            console.log(games)
            setAllGames(games.games)
        })
    }, [])

    return (
        allgames.map((game)=>
        
        <View>
            <Text>Sean</Text>
            <Text>{game.score}</Text>
        </View>
        )
    )
}