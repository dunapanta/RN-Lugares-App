import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'

const MapScreen = () => {
    const mapRegion ={
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922, //zoom factor cuanto espacio ver desde el centro entre los 2 puntos lat y long
        longitudeDelta: 0.0421
    }
    return (
        <MapView 
            style={styles.map}
            region={mapRegion} //que mapa del mundo se debe enfocar
        />
    )
}

const styles = StyleSheet.create({
    map:{
        flex: 1
    }
})

export default MapScreen