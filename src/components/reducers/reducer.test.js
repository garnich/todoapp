import reducer from './reducer'
import { INIT } from './../constants/constants'
import { 
    addUidAction, 
    addTodoListAction, 
    logoutAction, 
    upadteTodoList, 
    updateSearch, 
    updateFilter 
} from './../actions/actionsTodo'

const initialState = {
        todoState: {
            uid: '',
            todo: [],
            search: '',
            filter: 'all',
            loading: true
        },
        authState: {
            singInEmail: '',
            singInPassword: '',
            singUpEmail: '',
            singUpPassword1: '',
            singUpPassword2: '',
            emailNotVerified: true,
            createUserWithEmailAndPassword: false,
            error: null,
          }
    };

describe('reducer', () => {
    test('INIT', () => {
        const action = {
            type: INIT
        }

        expect(reducer(undefined, action)).toEqual({
            ...initialState
          })
    });

    test('ADD_UID', () => {
        const uid = '123'
        const action = addUidAction(uid);

        expect(reducer(initialState, action)).toEqual({
            todoState: {
                ...initialState.todoState,
                uid: '123'
            },
            authState: initialState.authState
          })
    });

    test('ADD_TODO_LIST', () => {
        const todo = ['1', '2', '3']
        const action = addTodoListAction(todo)

        expect(reducer(initialState, action)).toEqual({
            todoState: {
                ...initialState.todoState,
                todo: ['1', '2', '3'],
                loading: false
            },
            authState: initialState.authState
          })
    });

    test('ADD_TODO_LIST empty todo', () => {
        const action = addTodoListAction(null)

        expect(reducer(initialState, action)).toEqual({
            todoState: {
                ...initialState.todoState,
                todo: [],
                loading: false
            },
            authState: initialState.authState
          })
    });

    test('LOGGIN_OUT', () => {
        const action = logoutAction()

        expect(reducer(initialState, action)).toEqual({
            todoState: {
                ...initialState.todoState,
                todo: [],
                uid: ''
            },
            authState: initialState.authState
          })
    });

    test('UPDATE_TODO_LIST', () => {
        const todo = ['1', '2', '3']
        const action = upadteTodoList(todo)
        const state = { 
            todoState: {
                ...initialState.todoState,
                todo: ['1', '2']
            },
            authState: initialState.authState
        }

        expect(reducer(state, action)).toEqual({
            todoState: {
                ...state.todoState,
                todo: ['1', '2', '3']
            },
            authState: state.authState
          })
    });

    test('UPDATE_TODO_LIST empty todo', () => {
        const action = upadteTodoList(null)
        const state = { 
            todoState: {
                ...initialState.todoState,
                todo: ['1', '2']
            },
            authState: initialState.authState
        }

        expect(reducer(state, action)).toEqual({
            todoState: {
                ...state.todoState,
                todo: []
            },
            authState: state.authState
          })
    });

    test('UPDATE_TODO_LIST empty todo', () => {
        const action = upadteTodoList()
        const state = { 
            todoState: {
                ...initialState.todoState,
                todo: ['1', '2']
            },
            authState: initialState.authState
        }

        expect(reducer(state, action)).toEqual({
            todoState: {
                ...state.todoState,
                todo: []
            },
            authState: state.authState
          })
    });

    test('UPDATE_SEARCH', () => {
        const text = '123'
        const action = updateSearch(text)

        expect(reducer(initialState, action)).toEqual({
            todoState: {
                ...initialState.todoState,
                search: '123'
            },
            authState: initialState.authState
          })
    });

    test('UPDATE_FILTER', () => {
        const text = 'all'
        const action = updateFilter(text)

        expect(reducer(initialState, action)).toEqual({
            todoState: {
                ...initialState.todoState,
                filter: 'all'
            },
            authState: initialState.authState
          })
    });

    test('default', () => {

        expect(reducer(initialState, {})).toEqual({
            ...initialState
          })
    });
})