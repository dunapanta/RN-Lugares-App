import * as FileSystem from 'expo-file-system'

import { insertPlace, fetchPlaces } from '../../helpers/db'
import ENV from '../../env'

export const ADD_PLACE = 'ADD_PLACE'
export const SET_PLACES = 'SET_PLACES'

export const addPlace = (title, image, location) => {
    return async dispatch => {
        // reverse geocoding
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`)
        if(!response.ok){
            throw new Error('Algo ha salido mal')
        }

        const resData = await response.json()
        //console.log(resData)
        if(!response.results){
            throw new Error('Algo ha salido mal')
        }
        const adrress = resData.results[0].formatted_address

        // el path necesita incluir el nombre del archivo que se usara en el futuro
        const fileName = image.split('/').pop()
        // documentDirectory is the main directory, if the user uninstall the app the folder also  will be erase
        const newPath = FileSystem.documentDirectory + fileName
        try{
            // move a file from a to b
            await FileSystem.moveAsync({
                from: image, //the path temporary directory that expo provides
                to: newPath
            })
            const dbResult = await insertPlace(
                title, 
                newPath, 
                adrress, 
                location.lat, 
                location.lng
                )
            console.log(dbResult)
            dispatch({
                type: ADD_PLACE,
                placeData: {
                    id: dbResult.insertId,
                    title: title,
                    image: newPath,
                    address,
                    coords:{
                        lat: location.lat, 
                        lng: location.lng
                    }
                }
            })
        }catch(err){
            console.log(err)
            throw err
        }

    }
}

export const loadPlaces = () => {
    return async dispatch => {
        try{
            const dbResult = await fetchPlaces()
            //console.log(dbResult)
            dispatch({
                type: SET_PLACES,
                places: dbResult.rows._array
            })

        }catch(err){
            throw err
        }
        
    }
}


