import initialState from '../initialState'
import { 
    INIT,
    ADD_UID, 
    ADD_TODO_LIST, 
    LOGGIN_OUT, 
    UPDATE_TODO_LIST,
    UPDATE_SEARCH ,
    UPDATE_FILTER
} from './../constants/constants'

export default function reducer(state = initialState, action){

    switch (action.type) {
        case INIT:
            return state;
        case ADD_UID:
            return {...state, uid: action.payload};
        case ADD_TODO_LIST:
            return {
                ...state, 
                todo: action.todo || [], 
                loading: action.loading
            };
        case LOGGIN_OUT:
            return {
                ...state,
                todo: [], 
                uid: ''
            };
        case UPDATE_TODO_LIST:
            return {
                ...state,
                todo: action.todo || []
            }
        case UPDATE_SEARCH:
            return {
                ...state,
                search: action.search
            }
        case UPDATE_FILTER:
            return {
                ...state,
                filter: action.filter
            }
        default:
            return state;
    }

}
