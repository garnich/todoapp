import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { 
  addUidAction, 
  addTodoListAction, 
  logoutAction, 
  upadteTodoList,
  updateSearch,
  updateFilter 
} from './actions/actionsTodo'
import { 
  updateDataInFirebase, 
  updateItemInFireBase, 
  deleteItemInFireBase,
  dataRefFirebase
} from '../services/firebase_reqests'

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
import ErrorBoundary from './errorBoundary'
import AuthorizationForm from './authorizationForm'

import '../scss/main.scss'

class App extends Component {
  constructor() {
    super()

    this.deleteItem = id => {
      const { todo, uid } = this.props
      const idx = todo.findIndex(el => el.id === id)
      const newData = [...todo.slice(0, idx), ...todo.slice(idx + 1)]

      this.props.updateTodo(newData)

      deleteItemInFireBase(newData, 'Item REMOVED', uid)
    }

    this.addToDone = id => {
      const { todo, uid } = this.props
      const idx = todo.findIndex(el => el.id === id)
      const oldItem = todo[idx]
      const newItem = { ...oldItem, done: !oldItem.done }

      this.props.updateTodo([...todo.slice(0, idx), newItem, ...todo.slice(idx + 1)])

      updateItemInFireBase(idx, newItem, 'Item add to DONE', uid)
    }

    this.addToImportant = id => {
      const { todo, uid } = this.props
      const idx = todo.findIndex(el => el.id === id)
      const oldItem = todo[idx]
      const newItem = { ...oldItem, important: !oldItem.important }

      this.props.updateTodo([...todo.slice(0, idx), newItem, ...todo.slice(idx + 1)])

      updateItemInFireBase(idx, newItem, 'Item change importance', uid )
    }

    this.addNewItem = text => {
      const { todo } = this.props

      const newItem = {
        name: text,
        hide: true,
        id: new Date().getTime(),
        important: false,
        done: false,
      }

      this.props.updateTodo([...todo, newItem])
    }

    this.searchParam = text => {
      this.props.updateSearch(text)
    }

    this.filterParam = (items, filter) => {
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

    this.onFilterChange = filter => {
      this.props.updateFilter(filter)
    }

    this.onAuthChange = uid => {

      const { addUid, addTodo } = this.props;

      addUid(uid)
      dataRefFirebase(uid, addTodo, 'Connection to DataBase')
    }

    this.logout = () => {
      this.props.logout()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { uid, todo } = this.props
    const prevLength = prevProps.todo.length
    const currentLength = todo.length

    if (prevLength < currentLength) {
      updateDataInFirebase(uid, todo, 'New item add')
    }
  }

  render() {
    const { uid, todo, search, filter, loading } = this.props

    const done = todo.filter(item => item.done === false)

    const todoFiltered = this.filterParam(
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
          <Header auth={uid} logout={this.logout} />
          <Switch>
            <Fragment>
              <main>
                <Route exact path="/app/">
                  <HomePage />
                </Route>
                <Route path="/app/todo">
                  <ErrorBoundary>
                    {!uid && (
                      <AuthorizationForm onAuthChange={this.onAuthChange} />
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
                              searchParam={this.searchParam}
                            />
                            <ItemStatusFilter
                              filter={filter}
                              onFilterChange={this.onFilterChange}
                            />
                          </div>
                          {todoFiltered.length ? (
                            <TodoList
                              todo={todoFiltered}
                              onDeleted={this.deleteItem}
                              addToDone={this.addToDone}
                              addToImportant={this.addToImportant}
                            />
                          ) : (
                            <h2 className="ml-3">Just relax)))</h2>
                          )}
                          <NewItem addNewItem={this.addNewItem} />
                        </div>
                      </div>
                    )}
                  </ErrorBoundary>
                </Route>
                <Route path="/app/about">
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
}

const mapStateToProps = ({todoState}) => {
  return {
      uid: todoState.uid,
      todo: todoState.todo,
      search: todoState.search,
      filter: todoState.filter,
      loading: todoState.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUid: (uid) => {dispatch(addUidAction(uid))},
    addTodo: (todo) => {dispatch(addTodoListAction(todo))},
    logout: () => {dispatch(logoutAction())},
    updateTodo: (todo) => {dispatch(upadteTodoList(todo))},
    updateSearch: (text) => {dispatch(updateSearch(text))},
    updateFilter: (filter) => {dispatch(updateFilter(filter))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
