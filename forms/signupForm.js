
import React, { useState } from 'react'
import { globalStyles } from '../shared/global'
import { Formik } from 'formik'
import { TextInput, View, Text, Button, StyleSheet } from 'react-native'

export default function SignUpForm(props) {
return(
<View>
    <Formik initialValues={{ name: '', password: '', confirmPassword: '' }}
        onSubmit={(values) => {
            // values.preventDefault()
            console.log(values.name, values.password, "submitted")
            console.log("submit signup")
            fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    name: values.name,
                    password: values.password
                })
            })
                .then(res => res.json())
                .then(signUp => console.log(signUp))
        }}>
        {({ handleChange, handleSubmit, values }) => (
            <View>
                <TextInput
                    style={globalStyles.input}
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
                <TextInput
                    style={globalStyles.input}
                    placeholder='confirm password'
                    onChangeText={handleChange('confirmPassword')}
                    value={values.confirmPassword}
                    type='hidden'
                />
                <Button title='Sign up' color='maroon' onPress={handleSubmit} />
                <Button title='Back to Login' color='maroon' onPress={() => props.setSignUpForm(false)} />
            </View>
        )}
    </Formik>
</View>)
}