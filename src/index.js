import React from 'react'
import ReactDom from 'react-dom'
import App from './components/app'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './components/reducers/reducer'


const store = createStore(reducer, composeWithDevTools());

ReactDom.render(
    <Provider store={store}>
       <App /> 
    </Provider>, 
document.getElementById('root'))
