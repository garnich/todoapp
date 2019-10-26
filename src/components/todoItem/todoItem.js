import React, { Component } from 'react';
import './todoItem.css';

const TodoItem = (props) => {   
        const {
            name, 
            delItem, 
            addToDone, 
            addToImportant, 
            done, 
            important} = props;
        let classNames = '';
        if(done) classNames += ' done';
        if(important) classNames += ' important';

    return (
        <li className="list-group-item d-flex justify-content-between">
            <span
                onClick={ addToDone }
                className={ classNames }
            >{name}</span>
            <span>
                <button
                    className="btn btn-outline-success"
                    onClick={addToImportant}
                >
                    <i className="fa fa-flag" />
                </button>
                <button
                    className="btn btn-outline-danger"
                    onClick={delItem}
                >
                    <i className="fa fa-trash-o" />
                </button>
            </span>
        </li>
    )    
};

export default TodoItem;
