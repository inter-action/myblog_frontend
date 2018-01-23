import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'mobx-react'

import Routes from './routes'
import * as store from './store'

import 'normalize.css'
import './styles/global.scss'

export function App(){
  return (
    <Provider {...store}>
      <Routes />
    </Provider>
  )
}


export function render(Component) {
  ReactDOM.render(
      <Component />
      , document.querySelector('.app'))
}
