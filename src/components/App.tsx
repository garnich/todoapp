import React, { Fragment, useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Header from './header'
import HomePage from './homePage'
import AboutPage from './aboutPage'
import Footer from './footer'
import Title from './title'
import FormControl from './formControl'
import ItemStatusFilter from './itemStatusFilter'
import TodoList from './todoList'
import NewItem from './newItem'
import Loader from './loader'
// import ErrorBoundary from './errorBoundary'
import AuthorizationForm from './authorizationForm'
import firebase, { errorCatcher } from '../Firebase'

import '../scss/main.scss'

type FilterMarker = 'all' | 'todo' | 'done';

interface Itodo {
    done: boolean,
    hide: boolean,
    id: string,
    important: boolean,
    name: string
}

interface Istate {
    uid: string,
    todo: Array<Itodo>,
    search: string,
    filter: FilterMarker,
    loading: boolean,
}

const state: Istate = {
    'uid': '', //for dev => 'HC2pcfkRXEdnMCW3aWmiP0x8HbH2'
    'todo': [],
    'search': '',
    'filter': 'all',
    'loading': true, //for dev => false
}

const App = () => {
    const [appState, setAppstate] = useState<Istate>(state);

    function deleteItem (id: string): void {
        const { todo } = appState;
        const idx: number = todo.findIndex(el => el.id === id)
        console.log('deleteItem', idx)
        const newData = [...todo.slice(0, idx), ...todo.slice(idx + 1)]
        console.log('deleteItem newData', newData)
        
        setAppstate({
            ...appState,
            todo: newData
        })

      deleteItemInFireBase(newData, 'Item REMOVED')
    }

    function deleteItemInFireBase (data: Array<Itodo>, msg: string): void {
        const { uid } = appState;
        
        firebase
        .database()
        .ref(`${uid}/todo`)
        .remove()

        firebase
        .database()
        .ref(`${uid}/todo`)
        .set(data, error => errorCatcher(error, msg))
    }

    function addToDone(id: string): void {
        const { todo } = appState;
        const idx: number = todo.findIndex(el => el.id === id)
        const oldItem = todo[idx]
        const newItem = { ...oldItem, done: !oldItem.done }

        setAppstate({
            ...appState,
            todo: [...todo.slice(0, idx), newItem, ...todo.slice(idx + 1)],
        })
        updateItemInFireBase(idx, newItem, 'Item add to DONE')
      }

    function addToImportant(id: string):void {
        const { todo } = appState
        const idx = todo.findIndex(el => el.id === id)
        const oldItem = todo[idx]
        const newItem = { ...oldItem, important: !oldItem.important }

        setAppstate({
            ...appState,
            todo: [...todo.slice(0, idx), newItem, ...todo.slice(idx + 1)]
        })

        updateItemInFireBase(idx, newItem, 'Item change importance')
    }

    function updateItemInFireBase(itemIndex: number, newItemData: Itodo, msg: string):void {
        const { uid } = appState;

        firebase
        .database()
        .ref(`${uid}/todo/${itemIndex}`)
        .update(newItemData, error => errorCatcher(error, msg))
    }

    function addNewItem (text: string): void {
        const { todo } = appState;
        const newItem: Itodo = {
            name: text,
            hide: true,
            id: new Date().getTime().toString(),
            important: false,
            done: false,
        };

        setAppstate({
            ...appState,
            todo: [...todo, newItem]
        })
    }

    function searchParam(text:string):void {
        setAppstate({
            ...appState,
            search: text
        })
    }

    function filterParam(items:Array<Itodo>, filter: string):Array<Itodo> {
        if (items) {
            switch (filter) {
                case 'all':
                return items
                case 'todo':
                return items.filter(item => !item.done)
                case 'done':
                return items.filter(item => item.done)
                default:
                return items
            }
        }
    }

    function onFilterChange(filter: FilterMarker): void {
        setAppstate({
            ...appState,
            filter: filter
        })
    }

    function onAuthChange(data: string): void{
        const ref = firebase.database().ref(`${data}/todo`)

        ref.on('value', snapshot => {
        const ToDo = snapshot.val()
        
        const newState = {
          ...appState,
          todo: ToDo || [],
          loading: false,
          uid: data
        };
        setAppstate({...newState}),
          (error: any): void => errorCatcher(error, 'Connection to DataBase')
        })
    }

    function logout():void {
        setAppstate({
            ...appState,
            uid: ''
        })
        console.log('USER logged out SUCSESSFULY!')
    }

    // useEffect(() => {
    //     const { uid, todo } = appState;
    //     console.log('updated')

    //     firebase
    //         .database()
    //         .ref(`${uid}/todo`)
    //         .set(todo, error => errorCatcher(error, 'New item add'))
    // // }, [appState.todo]);
    // }, []);

    const { uid, todo, search, filter, loading } = appState;
    console.log('TODO', todo)
    const done = todo.filter(item => item.done === false)
    console.log('done', done)

    const todoFiltered = filterParam(
      todo.filter(item => {
        if (search.length === 0) {
          return todo
        }
        return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1
      }),
      filter
    )

    return (
              <Fragment>
                <Router>
                  <Header auth={uid} logout={logout} />
                  <Switch>
                    <Fragment>
                      <main>
                        <Route exact path="/">
                          <HomePage />
                        </Route>
                        <Route path="/todo">
                          {/* <ErrorBoundary> */}
                            {!uid && (
                              <AuthorizationForm onAuthChange={onAuthChange} />
                            )}
                            {uid && loading && <Loader />}
                            {uid && !loading && (
                              <div className="col-8 m-auto">
                                <div>
                                  <Title
                                    done={todo.length - done.length}
                                    todo={done.length}
                                  />
                                  <div className="top-panel d-flex">
                                    <FormControl
                                      placeholder="search"
                                      searchParam={searchParam}
                                    />
                                    <ItemStatusFilter
                                      filter={filter}
                                      onFilterChange={onFilterChange}
                                    />
                                  </div>
                                  <div className="d-flex flex-start new-item-wrapper">
                                    <NewItem addNewItem={addNewItem} />
                                  </div>
                                  <div className="todo-list-wrapper">
                                    {todoFiltered.length ? (
                                      <TodoList
                                        todo={todoFiltered}
                                        onDeleted={deleteItem}
                                        addToDone={addToDone}
                                        addToImportant={addToImportant}
                                      />
                                    ) : (
                                      <div>
                                        <h2 className="ml-3 p-3">Just relax)))</h2>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          {/* </ErrorBoundary> */}
                        </Route>
                        <Route path="/about">
                          <AboutPage />
                        </Route>
                      </main>
                    </Fragment>
                  </Switch>
                </Router>
                <Footer />
              </Fragment>
            )
}

export default App