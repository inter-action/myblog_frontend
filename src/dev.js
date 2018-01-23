import React from 'react'
import { AppContainer } from 'react-hot-loader';

import { App, render } from './app'

let root = (C) => (
    () => <AppContainer><C /></AppContainer>
)

window.addEventListener('DOMContentLoaded', () => {
    render(root(App))

    if (module.hot) {
        module.hot.accept('./app', () => {
            console.log('Accepting the updated printMe module!');
            render(root(App))
        })
    }

})


