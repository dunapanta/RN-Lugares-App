import React, { useState } from 'react'
import { ScrollView, View, Text, Button, TextInput, StyleSheet } from 'react-native'

import Colors from '../constants/Colors'

const NewPlaceScreen = () => {
    const [title, setTitle] = useState('')

    const titleChangeHandler = text => {
        setTitle(text)
    }

    const savePlaceHandler = () => {

    }


    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Título</Text>
                <TextInput 
                    style={styles.textInput}
                    onChangeText={titleChangeHandler}
                    value={title}
                />
                <Button 
                    title='Guardar Lugar'
                    color={Colors.primary}
                    onPress={savePlaceHandler}
                />
            </View>
        </ScrollView>
    )
}

NewPlaceScreen.navigationOptions = {
    headerTitle: 'Agregar Lugar'
}

const styles = StyleSheet.create({
    form:{
        margin: 30
    },
    label:{
        fontSize: 18,
        marginBottom: 15
    },
    textInput:{
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      marginBottom: 15,
      paddingVertical: 4,
      paddingHorizontal: 2
    }
})


export default NewPlaceScreen