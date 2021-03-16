import React from 'react'
import { View, Button, Text, Image, StyleSheet, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

import Colors from '../constants/Colors'

const ImgPicker = () => {

    //Si el usuario ya acepto o declino los permisos no se vuelve a mostrar esto de permisos otra vez retorna lo que ya obtuvo antes
    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.MEDIA_LIBRARY)
        // para la galeria el permiso es CAMERA_ROLL

        if(result.status !== 'granted'){
            //Si el usuario declino el permiso
            Alert.alert('Permiso denegado', 'Debe otorgar permisos de cámara para usar esta función', 
            [{text: 'Aceptar'}])
            return false
        }
        return true
    }

    const takeImageHandler = async () => {
        //permiso de camara
        const hasPermission = await verifyPermissions()
        if(!hasPermission){
            return
        }
        //abrira la camara del dispositivo, esta func retorna un a promesa
        ImagePicker.launchCameraAsync()
    }

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                <Text style={styles.text}>Aún no se han agregado imagenes</Text>
                <Image style={styles.image}/>
            </View>
            <Button 
                    title="Tomar Imagen"
                    color={Colors.primary}
                    onPress={takeImageHandler}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    imagePicker:{
        alignItems: 'center'
    },
    imagePreview:{
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    text:{
        fontSize: 16,
        color: Colors.secondary
    },
    image:{
        width: '100%',
        height: '100%'
    }
})

export default ImgPicker