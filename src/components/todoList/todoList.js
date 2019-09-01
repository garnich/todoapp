import React from 'react';
import TodoItem from '../todoItem';

const TodoList = (props) => {

    if(!props.todo.length) return null;

    return (
        <ul className="list-group">
            {props.todo.map((item, index) => <TodoItem key = {item+index} item={item} />)}
        </ul>
    );
};

export default TodoList;