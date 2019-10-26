import React from 'react';
import './title.css';

const Title = ({todo, done}) => {
    return(
        <div className="title pr-1">
            <h1 className="pr-1">My ToDo App</h1>
            <span>to do {todo}, done {done}</span>
        </div>
    );
}

export default Title;
