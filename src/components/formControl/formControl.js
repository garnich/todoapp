import React, {Component} from 'react';

import './formControl.css';

export default class FormControl extends Component{

    constructor(){
        super();

        this.changeSearch = (e) => {
            this.props.searchParam(e.target.value);
        }
    }    
    render(){
        return (
            <div className='search'>
                <input 
                    className='form-control'
                    placeholder={this.props.placeholder}
                    onChange={this.changeSearch}                    
                />                
            </div>
        );
    };
};
