import todoStateCreator from './todoStateCreator'
import authStateCreator from './authStateCreator'

export default function reducer(state, action){

    return {
        todoState: todoStateCreator(state, action),
        authState: authStateCreator(state, action)
    }
}
