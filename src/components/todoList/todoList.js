import React from 'react';
import TodoItem from '../todoItem';

import './todoList.css';

const TodoList = ({todo, onDeleted, addToDone, addToImportant}) => {

    if(!todo.length) return null;

    return (
        <ul className="list-group container-fluid">
            {todo.map(({name,id, important, done}) => {
                return (
                    <TodoItem 
                        key = {id} 
                        name={name}
                        important={important}
                        done={done}
                        delItem={() => onDeleted(id)}
                        addToDone={() => addToDone(id)}
                        addToImportant={() => addToImportant(id)}
                    />
                )
             })
            }
        </ul>
    );
};

export default TodoList;