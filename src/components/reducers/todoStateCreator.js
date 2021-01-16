import { 
    ADD_UID, 
    ADD_TODO_LIST, 
    LOGGIN_OUT, 
    UPDATE_TODO_LIST,
    UPDATE_SEARCH ,
    UPDATE_FILTER
} from './../constants/constants'

const todoStateCreator = (state, action) => {
    if(state === undefined) {
        return {
            uid: '',
            todo: [],
            search: '',
            filter: 'all',
            loading: true
        }
    }

    switch (action.type) {
        case ADD_UID:
            return { 
                ...state.todoState,
                uid: action.payload
            };
        case ADD_TODO_LIST:
            return {
                ...state.todoState,
                todo: action.todo || [], 
                loading: action.loading
            };
        case LOGGIN_OUT:
            return {
                ...state.todoState,
                todo: [], 
                uid: ''
            };
        case UPDATE_TODO_LIST:
            return {
                ...state.todoState,
                todo: action.todo || []
            }
        case UPDATE_SEARCH:
            return {
                ...state.todoState,
                search: action.search
            }
        case UPDATE_FILTER:
            return {
                ...state.todoState,
                filter: action.filter
            }
        default:
            return state.todoState;
    }
}

export default todoStateCreator