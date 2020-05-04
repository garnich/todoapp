import React, { Component, Fragment } from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Header from './components/header'
import HomePage from './components/homePage'
import AboutPage from './components/aboutPage'
import Footer from './components/footer'
import Title from './components/title'
import FormControl from './components/formControl'
import ItemStatusFilter from './components/itemStatusFilter'
import TodoList from './components/todoList'
import NewItem from './components/newItem'
import Loader from './components/loader'
import ErrorBoundary from './components/errorBoundary'
import AuthorizationForm from './components/authorizationForm'
import firebase, { errorCatcher } from './Firebase'

import './scss/main.scss'

class App extends Component {
  constructor() {
    super()
    this.state = {
      uid: '', //for dev => 'HC2pcfkRXEdnMCW3aWmiP0x8HbH2'
      todo: [],
      search: '',
      filter: 'all',
      loading: true, //for dev => false
    }

    this.deleteItem = id => {
      const { todo } = this.state
      const idx = this.state.todo.findIndex(el => el.id === id)
      const newData = [...todo.slice(0, idx), ...todo.slice(idx + 1)]

      this.setState({
        todo: newData,
      })

      this.deleteItemInFireBase(newData, 'Item REMOVED')
    }

    this.deleteItemInFireBase = (data, msg) => {
      const { uid } = this.state

      firebase
        .database()
        .ref(`${uid}/todo`)
        .remove()

      firebase
        .database()
        .ref(`${uid}/todo`)
        .set(data, error => errorCatcher(error, msg))
    }

    this.addToDone = id => {
      const { todo } = this.state
      const idx = todo.findIndex(el => el.id === id)
      const oldItem = todo[idx]
      const newItem = { ...oldItem, done: !oldItem.done }

      this.setState({
        todo: [...todo.slice(0, idx), newItem, ...todo.slice(idx + 1)],
      })
      this.updateItemInFireBase(idx, newItem, 'Item add to DONE')
    }

    this.addToImportant = id => {
      const { todo } = this.state
      const idx = todo.findIndex(el => el.id === id)
      const oldItem = todo[idx]
      const newItem = { ...oldItem, important: !oldItem.important }

      this.setState({
        todo: [...todo.slice(0, idx), newItem, ...todo.slice(idx + 1)],
      })

      this.updateItemInFireBase(idx, newItem, 'Item change importance')
    }

    this.updateItemInFireBase = (itemIndex, newItemData, msg) => {
      const { uid } = this.state

      firebase
        .database()
        .ref(`${uid}/todo/${itemIndex}`)
        .update(newItemData, error => errorCatcher(error, msg))
    }

    this.addNewItem = text => {
      this.setState(({ todo }) => {
        const newItem = {
          name: text,
          hide: true,
          id: new Date().getTime(),
          important: false,
          done: false,
        }

        return {
          todo: [...todo, newItem],
        }
      })
    }

    this.searchParam = text => {
      this.setState({
        search: text,
      })
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
      this.setState({ filter })
    }

    this.onAuthChange = uid => {
      this.setState({ uid })

      const ref = firebase.database().ref(`${uid}/todo`)

      ref.on('value', snapshot => {
        const ToDo = snapshot.val()

        this.setState({
          todo: ToDo || [],
          loading: false,
        }),
          error => errorCatcher(error, 'Connection to DataBase')
      })
    }

    this.logout = () => {
      this.setState({ uid: '' })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevLength = prevState.todo.length
    const currentLength = this.state.todo.length
    const { uid } = this.state

    if (prevLength < currentLength) {
      firebase
        .database()
        .ref(`${uid}/todo`)
        .set(this.state.todo, error => errorCatcher(error, 'New item add'))
    }
  }

  render() {
    const { uid, todo, search, filter, loading } = this.state
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

ReactDom.render(<App />, document.getElementById('root'))
