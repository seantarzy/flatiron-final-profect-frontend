import React, { useState, forEach } from 'react'
import {globalStyles} from '../shared/global'
import {Formik} from 'formik'
import { TextInput, View, Text, Button, StyleSheet} from 'react-native'

export default function loginForm(props){
    return (
 <View >
<Formik initialValues={{name: '', password: ''}} 
onSubmit={(values)=>{

console.log(values, "submitted")
fetch('http://localhost:3000/users')
.then(res=>res.json())
.then(users=> {
  
      let loggedInUser = users.users.forEach(user => console.log("user",user.name,user.password))
        // user.name === values.name && user.password === values.password)
//    console.log("logged in", loggedInUser)
       if  (loggedInUser){
        {()=>  props.setLoggedIn(true)}
       }
       else {
              alert('Sorry Homie, no user with those credentials')
       }

})
}}>
{({handleChange, handleSubmit, values})=>(
<View>
<TextInput 
style ={globalStyles.input}
placeholder='Enter Name'
onChangeText={handleChange('name')}
value={values.name}
/>
<TextInput 
style={globalStyles.input}
placeholder='Enter password'
onChangeText={handleChange('password')}
value={values.password}
type='hidden'
/>
<Button title='Login' color='maroon' onPress={handleSubmit}/>
</View>
)}
</Formik>
</View >
    )

}

const styles = StyleSheet.create({
    container: {
        // flex: .5,
        // marginTop: 5,
        // marginBottom: 5,
        // backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
    },
});