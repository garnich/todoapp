import { 
    ADD_UID, 
    ADD_TODO_LIST, 
    LOGGIN_OUT, 
    UPDATE_TODO_LIST,
    UPDATE_SEARCH,
    UPDATE_FILTER 
} from '../constants/constants'

const addUidAction = uid => ({
    type: ADD_UID,
    payload: uid
})

const addTodoListAction = (todo = []) => ({
    type: ADD_TODO_LIST,
    todo,
    loading: false 
})

const logoutAction = () => ({
    type: LOGGIN_OUT
})

const upadteTodoList = (todo = []) => ({
    type: UPDATE_TODO_LIST,
    todo
})

const updateSearch = (text) => ({
    type: UPDATE_SEARCH,
    search: text
})

const updateFilter = (filter) => ({
    type: UPDATE_FILTER,
    filter
})

export { 
    addUidAction, 
    addTodoListAction, 
    logoutAction, 
    upadteTodoList, 
    updateSearch, 
    updateFilter 
} 