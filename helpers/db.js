import * as SQLite from 'expo-sqlite';

//El código se ejecuta cuando importamos este archivo 
const db = SQLite.openDatabase('places.db')

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        // crear tablas
        db.transaction( (tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);', 
            [],
            () => {
                //success function
                resolve()
            },
            (_, err) => {
                // error function
                reject(err)
            }
            )
        })
    })
    return promise
}

//Store Data
export const insertPlace  = (title, imagaUri, address, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction( (tx) => {
            tx.executeSql(
                //no se debe utilizar templete string porque se podria dar sql injection ej en vez de title ingresan un comando sql
                // por eso se usa ?
                `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);`, 
                [title, imagaUri, address, lat, lng],
                (_, result) => {
                    //success function
                    resolve(result)
                },
                (_, err) => {
                    // error function
                    reject(err)
                }
                )
        })
    })
    return promise
}

//Fetch data
export const fetchPlaces = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction( (tx) => {
            tx.executeSql(
                //no se debe utilizar templete string porque se podria dar sql injection ej en vez de title ingresan un comando sql
                // por eso se usa ?
                'SELECT * FROM places', 
                [],
                (_, result) => {
                    //success function
                    resolve(result)
                },
                (_, err) => {
                    // error function
                    reject(err)
                }
                )
        })
    })
    return promise
}