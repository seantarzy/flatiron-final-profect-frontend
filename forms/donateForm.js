import React, { useState, forEach } from 'react'
import { globalStyles } from '../shared/global'
import { Formik, Field, FormikProps, Form } from 'formik'
import { TextInput, View, Text, Button, StyleSheet, Option, Picker, link } from 'react-native'

export default function DonateForm(props) {
    const [selectedCharityName, setSelectedCharityName] = useState("")
    const [selectedCharityObject, setSelectedCharityObject] = useState({})
    const [currentDonation, setCurrentDonation] = useState(0)

    // console.log(selectedCharityObject)
    return (
        <View >
            <Formik initialValues={{ charity: '', donation: 0 }}
                onSubmit={(values) => {

                    if(values.donation <= props.balance){

                    console.log(values, "submitted")
                    fetch('http://localhost:3000/donate', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json'
                        },
                        body: JSON.stringify({
                            'charity_id': selectedCharityObject.id,
                            'dollar_amount': values.donation, 
                            'user_id': 1
                        })
                        })
                        .then(res=>res.json())
                        .then(donation=>console.log(donation))
                
                    }
                    else{
                        alert("not enough shmoney")
                    }
                    
                }}>
                {({ handleChange, handleSubmit, values }) => (
                    <View>
                        {/* <Field as="select" name="color">
                            <Option value="red"></Option>
                            <Option value="green"></Option>
                            <Option value="blue"></Option>
                        </Field> */}
                        <Text>Your point total: {props.pointTotal}</Text>
                        <Text>Your Balance: {props.balance} {props.balance === 1 ? "dollar" : "dollars" }</Text>
                        <Text>Pick a Charity:</Text>
                        
                            <Picker
                            selectedValue={selectedCharityName}
                            onValueChange={itemValue => itemValue ? setSelectedCharityName(itemValue) : null}>
                            {props.charities.map(charity=> 
                            <Picker.Item label={charity.name} value={charity.name} />
                            )} 
                            {props.charities.map(charity =>
                            charity.name === selectedCharityName &&
                            setSelectedCharityObject(charity))
                            }
                        </Picker>            

                        <TextInput
                            style={globalStyles.input}
                            placeholder='Enter Donation'
                            onChangeText={handleChange('donation')}
                            value={values.donation}
                            type='hidden'
                        />
                        <Button title='Donate!' color='maroon' onPress={handleSubmit} />
                            <Text>{selectedCharityName}</Text>
                            <Text> link: {selectedCharityObject.link}</Text>
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