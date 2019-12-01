import React, { Component, Fragment } from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Header from './components/header'
import Footer from './components/footer'
import Title from './components/title'
import FormControl from './components/formControl'
import ItemStatusFilter from './components/itemStatusFilter'
import TodoList from './components/todoList'
import NewItem from './components/newItem'
import Loader from './components/loader'
import firebase, { errorCatcher } from './Firebase'

import './css/main.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      todo: [],
      search: '',
      filter: 'all',
    }

    this.createTodoItem = label => {
      return {
        name: label,
        hide: true,
        id: new Date().getTime(),
        important: false,
        done: false,
      }
    }

    this.deleteItem = id => {
      const { todo } = this.state
      const idx = this.state.todo.findIndex(el => el.id === id)

      this.setState({
        todo: [...todo.slice(0, idx), ...todo.slice(idx + 1)],
      })

      this.deleteItemInFireBase(idx, 'Item REMOVED')
    }

    this.deleteItemInFireBase = (itemIndex, msg) => {
      firebase
        .database()
        .ref(`todo/${itemIndex}`)
        .remove()
        .then(() => errorCatcher(false, msg))
        .catch(error => errorCatcher(error, ''))
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
      firebase
        .database()
        .ref(`todo/${itemIndex}`)
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
    this.onFilterChange = filter => {
      this.setState({ filter })
    }
  }

  componentDidMount() {
    const ref = firebase.database().ref('todo')

    ref.on('value', snapshot => {
      const ToDo = snapshot.val()
      this.setState({
        todo: ToDo,
      }),
        error => errorCatcher(error, 'Connection to DataBase')
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const prevTask = prevState.todo[prevState.todo.length - 1]
    const currentTask = this.state.todo[this.state.todo.length - 1]
    const prevLength = prevState.todo.length
    const currentLength = this.state.todo.length

    if (
      prevLength &&
      prevTask.id !== currentTask.id &&
      prevLength < currentLength
    ) {
      firebase
        .database()
        .ref('todo')
        .set(this.state.todo, error => errorCatcher(error, 'New item add'))
    }
  }

  render() {
    const { todo, search, filter } = this.state
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
          <Header />
          <Switch>
            <main>
              <Route exact path="/">
                <h1>Home Page</h1>
              </Route>
              <Route path="/login">
                <h1>Login Page</h1>
              </Route>
              <Route path="/todo">
                {!todo.length && <Loader />}
                {!!todo.length && (
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
              </Route>
            </main>
          </Switch>
        </Router>
        <Footer />
      </Fragment>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'))
