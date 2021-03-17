import React, { useState } from 'react'
import { ScrollView, View, Text, Button, TextInput, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'

import Colors from '../constants/Colors'
import * as placesActions from '../store/actions/places'
import ImgPicker from '../components/ImgPicker'
import LocationPicker from '../components/LocationPicker'

const NewPlaceScreen = ({ navigation }) => {
    const [title, setTitle] = useState('')
    const [selectedImage, setSelectedImage] = useState()

    const dispatch = useDispatch()

    const titleChangeHandler = text => {
        setTitle(text)
    }

    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath)
    }

    const savePlaceHandler = () => {
        dispatch(placesActions.addPlace(title, selectedImage))
        navigation.goBack()
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
                <ImgPicker onImageTaken={imageTakenHandler} />
                <LocationPicker />
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
        fontSize: 20,
        marginBottom: 10,
        color: Colors.secondary
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