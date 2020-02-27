import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Picker, CheckBox} from 'react-native';
import DonateForm from '../forms/donateForm'
<script src="http://localhost:8097"></script>


export default function Donate(props) {
    const [charities, setCharities] = useState(null)
    const [userGames, setUserGames] = useState(null)
    const [userDonations, setUserDonations] = useState(null)
    const [userPointTotal, updateUserPointTotal] = useState(0)
    const [userBalance, updateUserBalance] = useState(0)
    useEffect(() => {
        getCharities()
        getGames()
        calculateBalances()
        // getDonations()
    }, [userGames])

        const  getCharities = ()=>{ 
            fetch("http://localhost:3000/charities")
                .then(res => res.json())
                .then(charities => setCharities(charities.charities))
        }

       const getGames=()=>{
            fetch('http://localhost:3000/games')
                .then(res => res.json())
                .then(games => {
                    let currentUserGames = games.games.filter(game => game.user_id == 1)
                    setUserGames(currentUserGames)
                    // console.log("games", currentUserGames)

                })

        }

       const getDonations=()=>{
            fetch('http://localhost:3000/donations')
                .then(res => res.json())
                .then(donations => {
                    // console.log(donations.donations)
                    let currentUserDonations = donations.donations.filter(donation => donation.user_id == 1)
                    setUserDonations(currentUserDonations)
                    // if (userDonations) {
                    //     userDonations.forEach(donation => {
                    //         updateUserBalance(userBalance - donation.dollar_amount)
                    //     })
                    // }

                })
        }
   
   const calculateBalances =()=>{
        if (userGames) {
            console.log("gamess")
            let totalScore = 0
            userGames.forEach(game => {
                totalScore += game.score
            })
            updateUserBalance((Math.floor(totalScore / 10)))
            updateUserPointTotal(totalScore)
        }

    }

    // console.log("hello", charities)
// const renderCharityName = ()=>{
//   charities.forEach(charity => {
//       return charity.name
//   })
  
// }
// console.log("selected", selectedCharity)
if (charities && userGames){
    return (
        // <View>
        // {charities.map(charity=>
        // <View>
        //     <Picker 
        //             style={styles.picker}
        //             selectedValue={selectedCharityName}
        //             onValueChange={(itemValue) =>
        //                 setSelectedCharityName(itemValue)}>
        //         <Picker.Item label= {charity.name} value={charity.name}/>
        //     </Picker>
        //     <View>
        //     </View>
        // </View>
        // )}
        // <Text>{selectedCharityName}</Text>
        // </View>
        <View>
        <DonateForm charities = {charities}
        balance= {userBalance}
        pointTotal = {userPointTotal}
        />
        </View>
            
        )}
    else {
        return(
        <View>
    <Text>Loading...</Text>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    picker: {
        flex: -2,
        marginVertical: 2,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'green'
    }
})