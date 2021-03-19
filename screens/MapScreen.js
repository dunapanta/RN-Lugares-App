import React, { useState, useEffect, useCallback } from 'react'
import { Text, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

import Colors from '../constants/Colors'

const MapScreen = ({ navigation }) => {
    const initialLocation = navigation.getParam('initialLocation')
    const readOnly = navigation.getParam('readOnly')

    const [selectedLocation, setSelectedLocation] = useState(initialLocation)

    const mapRegion ={
        latitude: initialLocation ? initialLocation.lat : 37.78,
        longitude: initialLocation ? initialLocation.lng : -122.43,
        latitudeDelta: 0.0922, //zoom factor cuanto espacio ver desde el centro entre los 2 puntos lat y long
        longitudeDelta: 0.0421
    }

    const selectLocationHandler = event => {
        if(readOnly){
            return
        }
        //console.log(event)
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        })
    }

    const savePickedLocationHandler = useCallback(() => {
        if(!selectedLocation){
            Alert.alert('Locación No Seleccionada', 'Debe seleccionar en el mapa para guardar la locación', 
            [{text: 'Aceptar'}])
            return
        }
        //En vez de goBack se utiliza la misma forma de navegar y no importa la pila de navegacion no se pone adelante de la que venimos
        navigation.navigate('NewPlace', {
           pickedLocation: selectedLocation
        })
    }, [selectedLocation])

    useEffect( () => {
        navigation.setParams({
            saveLocation: savePickedLocationHandler
        })
    }, [savePickedLocationHandler])

    let markerCoordinates

    if(selectedLocation){
        markerCoordinates ={
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
        }
    }

    return (
        <MapView 
            style={styles.map}
            region={mapRegion} //que mapa del mundo se debe enfocar
            onPress={selectLocationHandler}
        >
            {markerCoordinates && <Marker title='Locación' coordinate={markerCoordinates}></Marker>}
        </MapView>
    )
}

MapScreen.navigationOptions = navData => {

    const saveFn = navData.navigation.getParam('saveLocation')
    const readOnly = navData.navigation.getParam('readOnly')
    if (readOnly){
        return {}
    }
    return {
        headerTitle: "Mapa",
        headerRight: () => (
                        <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
                            <Text style={styles.headerButtonText}>Guardar</Text>
                        </TouchableOpacity>
                        )
    }  
}

const styles = StyleSheet.create({
    map:{
        flex: 1
    },
    headerButton:{
        marginHorizontal: 20
    },
    headerButtonText:{
       fontSize: 16,
       color: Platform.OS === 'android' ? 'white' : Colors.primary
    }
})

export default MapScreen