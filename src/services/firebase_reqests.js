import firebase, { errorCatcher } from './Firebase'

const updateDataInFirebase = (uid, data, msg) => {
    firebase
      .database()
      .ref(`${uid}/todo`)
      .set(data, error => errorCatcher(error, msg))
}

const updateItemInFireBase = (itemIndex, newItemData, msg, uid) => {

    firebase
      .database()
      .ref(`${uid}/todo/${itemIndex}`)
      .update(newItemData, error => errorCatcher(error, msg))
}

const deleteItemInFireBase = (data, msg, uid) => {

    firebase
      .database()
      .ref(`${uid}/todo`)
      .remove()

      updateDataInFirebase(uid, data, msg)
}

const dataRefFirebase = (uid, func, msg) => { 
    firebase
        .database()
        .ref(`${uid}/todo`)
        .on('value', snapshot => {
            const data = snapshot.val()

            func(data),
            error => errorCatcher(error, msg)
        })
}


export  { 
    updateDataInFirebase, 
    updateItemInFireBase, 
    deleteItemInFireBase,
    dataRefFirebase
}