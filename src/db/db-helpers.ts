import {Itodo} from '../components/App'
import firebase, { errorCatcher } from './Firebase'

export const deleteItemInFireBase = (data: Array<Itodo>, id: string, msg: string): void => {
    firebase
    .database()
    .ref(`${id}/todo`)
    .remove()

    firebase
    .database()
    .ref(`${id}/todo`)
    .set(data, error => errorCatcher(error, msg))
  };

export const updateItemInFireBase = (id: string, itemIndex: number, newItemData: Itodo, msg: string):void => {
    firebase
    .database()
    .ref(`${id}/todo/${itemIndex}`)
    .update(newItemData, error => errorCatcher(error, msg))
}

export const updateFireBase = (id: string, data: Array<Itodo>) => {
    firebase
        .database()
        .ref(`${id}/todo`)
        .set(data, error => errorCatcher(error, 'Data updated'))
}

export const dbRef = (id:string) => {
    return firebase.database().ref(`${id}/todo`)
}