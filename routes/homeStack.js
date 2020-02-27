import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import Home from '../screens/home'
import About from '../screens/about'
import Donate from '../screens/donate'
import Leaderboard from '../screens/leaderboard'
import PlayGame from '../screens/playGame'



const screens = {
    Home: {
        screen: Home
    },
    PlayGame: {
        screen: PlayGame
    },
    Leaderboard: {
        screen: Leaderboard
    },
    About: {
    screen: About
    },
    Donate: {
        screen: Donate
    }
}
const homeStack = createStackNavigator(screens)

export default createAppContainer(homeStack)