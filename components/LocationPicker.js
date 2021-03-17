import React, { useState } from 'react'
import { View, Button, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

import Colors from '../constants/Colors'
import MapPreview from '../components/MapPreview'

const LocationPicker = () => {
    const [isFetching, setIsFetching] = useState(false)
    const [pickedLocation, setPickedLocation] = useState()

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

    return (
        <View style={styles.locationPicker}>
            <MapPreview style={styles.mapPreview} location={pickedLocation}>
                { isFetching 
                    ? <ActivityIndicator size='large' color={Colors.secondary}/>
                    : <Text style={styles.text}>Aún no se ha selecionado la locación</Text>
                }
            </MapPreview>
            <Button 
                title="Obtener la Ubicación del Usuario"
                color={Colors.primary}
                onPress={getLocationHandler}
            />
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
    }
})

export default LocationPicker