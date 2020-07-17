import reducer, { initialState } from './reducer'
import { INIT } from './../constants/constants'
import { 
    addUidAction, 
    addTodoListAction, 
    logoutAction, 
    upadteTodoList, 
    updateSearch, 
    updateFilter 
} from './../actions/actions'

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
            ...initialState,
            uid: '123'
          })
    });

    test('ADD_TODO_LIST', () => {
        const todo = ['1', '2', '3']
        const action = addTodoListAction(todo)

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            todo: ['1', '2', '3'],
            loading: false
          })
    });

    test('ADD_TODO_LIST empty todo', () => {
        const action = addTodoListAction(null)

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            todo: [],
            loading: false
          })
    });

    test('LOGGIN_OUT', () => {
        const action = logoutAction()

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            todo: [],
            uid: ''
          })
    });

    test('UPDATE_TODO_LIST', () => {
        const todo = ['1', '2', '3']
        const action = upadteTodoList(todo)
        const state = { 
            ...initialState,
            todo: ['1', '2']
        }

        expect(reducer(state, action)).toEqual({
            ...state,
            todo: ['1', '2', '3']
          })
    });

    test('UPDATE_TODO_LIST empty todo', () => {
        const action = upadteTodoList(null)
        const state = { 
            ...initialState,
            todo: ['1', '2']
        }

        expect(reducer(state, action)).toEqual({
            ...state,
            todo: []
          })
    });

    test('UPDATE_TODO_LIST empty todo', () => {
        const action = upadteTodoList()
        const state = { 
            ...initialState,
            todo: ['1', '2']
        }

        expect(reducer(state, action)).toEqual({
            ...state,
            todo: []
          })
    });

    test('UPDATE_SEARCH', () => {
        const text = '123'
        const action = updateSearch(text)

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            search: '123'
          })
    });

    test('UPDATE_FILTER', () => {
        const text = 'all'
        const action = updateFilter(text)

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            filter: 'all'
          })
    });

    test('default', () => {

        expect(reducer(initialState, {})).toEqual({
            ...initialState
          })
    });
})