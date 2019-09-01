import React from 'react';
import ReactDom from 'react-dom';

import Title from './components/title';
import Input from './components/input';
import TodoList from './components/todoList';


import './css/main.css';


const App = () => {
    const todo = ['Create template', 'Add structue', 'Add React components'];
    return(
        <div>
            <Title />
            <Input placeholder='search'/>
            <TodoList todo={todo}/>
        </div>
    );
};

ReactDom.render(<App />, document.getElementById('root'));