import React from 'react';
import './todoItem.css';

const TodoItem = (props) => {
    return (
        <li className="list-group-item">
            <span>{props.item}</span>
        </li>
    )
};

export default TodoItem;
