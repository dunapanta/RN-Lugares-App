import * as FileSystem from 'expo-file-system'

import { insertPlace, fetchPlaces } from '../../helpers/db'

export const ADD_PLACE = 'ADD_PLACE'
export const SET_PLACES = 'SET_PLACES'

export const addPlace = (title, image) => {
    return async dispatch => {
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
                'Dummy addres', 
                7.8, 
                4.6
                )
            console.log(dbResult)
            dispatch({
                type: ADD_PLACE,
                placeData: {
                    id: dbResult.insertId,
                    title: title,
                    image: newPath
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


