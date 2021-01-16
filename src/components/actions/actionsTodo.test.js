import { 
    addUidAction, 
    addTodoListAction, 
    logoutAction, 
    upadteTodoList, 
    updateSearch, 
    updateFilter 
}  from './actionsTodo'
import { 
    ADD_UID, 
    ADD_TODO_LIST, 
    LOGGIN_OUT, 
    UPDATE_TODO_LIST,
    UPDATE_SEARCH,
    UPDATE_FILTER 
} from '../constants/constants'

describe('actions', () => {
    it('addUidAction should create an action', () => {
      const uid = '123'
      const expectedAction = {
        type: ADD_UID,
        payload: uid
      }
      expect(addUidAction(uid)).toEqual(expectedAction)
    });

    it('addTodoListAction should create an action', () => {
        const todo = ['1', '2', '3']
        const expectedAction = {
            type: ADD_TODO_LIST,
            todo,
            loading: false 
        }
        const expectedActionWithEmptyTodo = {
            type: ADD_TODO_LIST,
            todo: [],
            loading: false 
        }

        expect(addTodoListAction(todo)).toEqual(expectedAction)
        expect(addTodoListAction()).toEqual(expectedActionWithEmptyTodo)
    });

    it('logoutAction should create an action', () => {
        const expectedAction = {
          type: LOGGIN_OUT
        }
        expect(logoutAction()).toEqual(expectedAction)
    });

    it('upadteTodoList should create an action', () => {
        const todo = ['1', '2', '3']
        const expectedAction = {
          type: UPDATE_TODO_LIST,
          todo
        }
        const expectedActionWithEmptyTodo = {
            type: UPDATE_TODO_LIST,
            todo: []
        }

        expect(upadteTodoList(todo)).toEqual(expectedAction)
        expect(upadteTodoList()).toEqual(expectedActionWithEmptyTodo)
    });

    it('updateSearch should create an action', () => {
        const text = '123'
        const expectedAction = {
          type: UPDATE_SEARCH,
          search: text
        }
        expect(updateSearch(text)).toEqual(expectedAction)
    });

    it('updateFilter should create an action', () => {
        const filter = 'all'
        const expectedAction = {
          type: UPDATE_FILTER,
          filter
        }
        expect(updateFilter(filter)).toEqual(expectedAction)
    });
  })