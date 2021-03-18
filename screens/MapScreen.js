import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

const MapScreen = () => {
    const [selectedLocation, setSelectedLocation] = useState()

    const mapRegion ={
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922, //zoom factor cuanto espacio ver desde el centro entre los 2 puntos lat y long
        longitudeDelta: 0.0421
    }

    const selectLocationHandler = event => {
        //console.log(event)
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        })
    }

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

const styles = StyleSheet.create({
    map:{
        flex: 1
    }
})

export default MapScreen