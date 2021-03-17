import * as FileSystem from 'expo-file-system'

export const ADD_PLACE = 'ADD_PLACE'

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
        }catch(err){
            console.log(err)
            throw err
        }

        dispatch({
            type: ADD_PLACE,
            placeData: {
                title: title,
                image: newPath
            }
        })
    }
}


