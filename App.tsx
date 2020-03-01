
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import LoginForm from './forms/loginForm.js'
import Home from './screens/home'
import HomeStack from './routes/homeStack'
import SignUpform from './forms/signupForm.js'
import './shim.js'
import crypto from 'crypto'

export default function App() {
   const [signUpForm, setSignUpForm] = useState(false)
    const renderSignUp = () => {
        // console.log("signup")
        setSignUpForm(true)
    }
  const [loggedIn, setLoggedin] = useState(true)
  return (
    <View style={styles.container}>
      {loggedIn ?
        <HomeStack/>
        :
      <View>
        {!signUpForm ?
        <View>
        <LoginForm setLoggedin = {setLoggedin}/>
        <Button title='Sign Up Form' color='maroon' onPress={renderSignUp} />
        </View>
        :
        <View>
        <SignUpform setSignUpForm={setSignUpForm}/>
        </View>
        }
      </View>
}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  
    flex: 1,
    backgroundColor: 'pink',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
