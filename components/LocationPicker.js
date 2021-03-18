import React, { useState, useEffect } from 'react'
import { View, Button, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

import Colors from '../constants/Colors'
import MapPreview from '../components/MapPreview'

const LocationPicker = ({ navigation }) => {
    const [isFetching, setIsFetching] = useState(false)
    const [pickedLocation, setPickedLocation] = useState()

    const mapPickedLocation = navigation.getParam('pickedLocation')

    useEffect( () => {
        if(mapPickedLocation){
            setPickedLocation(mapPickedLocation)
        }
    }, [mapPickedLocation])

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION)
        // para la galeria el permiso es CAMERA_ROLL

        if(result.status !== 'granted'){
            //Si el usuario declino el permiso
            Alert.alert('Permiso denegado', 'Debe otorgar permisos de locación para usar esta función', 
            [{text: 'Aceptar'}])
            return false
        }
        return true
    }

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions()
        if(!hasPermission){
            return
        }
        try{
            setIsFetching(true)
            const location = await Location.getCurrentPositionAsync({
                timeout: 5000
            })
            console.log(location)
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude

            })
        }catch(err){
            Alert.alert(
                'No se pudo obtener la ubicación', 
                err.message,
                [{text: 'Aceptar'}]
                )
        }
        setIsFetching(false)
    }

    const pickOnMapHandler = () => {
        navigation.navigate('Map')
    }

    return (
        <View style={styles.locationPicker}>
            <MapPreview style={styles.mapPreview} location={pickedLocation} onPress={pickOnMapHandler}>
                { isFetching 
                    ? <ActivityIndicator size='large' color={Colors.secondary}/>
                    : <Text style={styles.text}>Aún no se ha selecionado la locación</Text>
                }
            </MapPreview>
            <View style={styles.actions}>
                <Button 
                    title="Obtener Ubicación"
                    color={Colors.primary}
                    onPress={getLocationHandler}
                />
                <Button 
                    title="Ver en Mapa"
                    color={Colors.primary}
                    onPress={pickOnMapHandler}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    locationPicker:{
        marginBottom: 15
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    text:{
        fontSize: 16,
        color: Colors.secondary
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }
})

export default LocationPicker