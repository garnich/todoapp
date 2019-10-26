import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Title from './components/title';
import FormControl from './components/formControl';
import ItemStatusFilter from './components/itemStatusFilter'
import TodoList from './components/todoList';
import NewItem from './components/newItem';
import firebase from './Firebase';


import './css/main.css';


class App extends Component{  
    constructor(){
        super();
        this.maxId = 100;
        this.state = {
            todo: [],
            search: '',
            filter: 'all'
        };

        this.createTodoItem = (label) => {
            return {
                name: label,
                hide: true,
                id: maxId++,
                important: false,
                done: false
            }
        };

        this.deleteItem = (id) => {
            this.setState(({todo}) =>{
                const idx = this.state.todo.findIndex(el => el.id === id);
                return({
                    todo: [
                        ...todo.slice(0,idx), 
                        ...todo.slice(idx+1)
                    ]
                })
            })
        };

        this.addToDone = (id) => {
            this.setState(({todo})=>{
                const idx = this.state.todo.findIndex(el => el.id === id);
                const oldItem = todo[idx];
                const newItem = {...oldItem, done: !oldItem.done};
                return{
                    todo: [
                        ...todo.slice(0,idx),
                        newItem,
                        ...todo.slice(idx+1)
                    ]
                };
            })
        };

        this.addToImportant = (id) => {
            this.setState(({todo})=>{
                const idx = this.state.todo.findIndex(el => el.id === id);
                const oldItem = todo[idx];
                const newItem = {...oldItem, important: !oldItem.important};
                return{
                    todo: [
                        ...todo.slice(0,idx),
                        newItem,
                        ...todo.slice(idx+1)
                    ]
                };
            })
        }

        this.addNewItem = (text) => {
            this.setState(({todo})=> {
                const newItem = {
                    name: text,
                    hide: true,
                    id: this.maxId++,
                    important: false,
                    done: false
                };

                return {
                    todo: [
                        ...todo,
                        newItem
                    ]
                }
            })
        }

        this.searchParam = (text) => {
            this.setState({
                search: text
            })
        }

        this.filterParam = (items, filter) => {
            switch(filter) {
                case 'all':
                    return items;
                case 'todo':
                    return items.filter(item => !item.done);
                case 'done':
                    return items.filter(item => item.done);
                default:
                    return items;
            }
        }
        this.onFilterChange = (filter) => {
            this.setState({filter})
        }
    };
    
    componentDidMount(){
        const ref = firebase.database().ref('todo');

        ref.on('value', snapshot => {
            const ToDo = snapshot.val();
            this.setState({
                todo: ToDo
            })
        })
    }

    render(){
        const { todo, search, filter } = this.state;
        const done = todo.filter(item => item.done === false);
        const todoFiltered = this.filterParam(todo.filter(item => {
            if(search.length === 0){
                return todo;
            }
            return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1
        }), filter)

       return(
           <Router>
                <div>
                    <nav className="d-flex">
                       <ul className="list-group">
                            <li>
                                <Link to="/">Login</Link>
                            </li>
                            <li>
                                <Link to="/todo">ToDo</Link>
                            </li>
                        </ul> 
                    </nav>
                    

                <hr />
                    <Route exact path="/">
                        <div>
                            <h1>Login</h1>
                        </div>
                    </Route>
                    <Route path="/todo">
                        <div>
                            <Title done={todo.length - done.length} todo={done.length}/>
                            <div className='top-panel d-flex'>
                            <FormControl 
                                placeholder='search'
                                searchParam={this.searchParam}
                            />
                            <ItemStatusFilter
                                filter={filter}  
                                onFilterChange={this.onFilterChange}                      
                            />
                            </div>
                            {todoFiltered.length ?
                                <TodoList 
                                    todo={todoFiltered}
                                    onDeleted={this.deleteItem}  
                                    addToDone={this.addToDone}
                                    addToImportant={this.addToImportant}
                                />
                            : <h2 className='ml-3'>Just relax)))</h2>
                            }
                            <NewItem 
                                addNewItem={this.addNewItem}
                            />
                        </div> 
                    </Route> 
                </div>             
           </Router>
        ); 
    }    
};

ReactDom.render(<App />, document.getElementById('root'));