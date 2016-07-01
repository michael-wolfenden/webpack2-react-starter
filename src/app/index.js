/* eslint-disable global-require */

import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import Root from 'components/Root'
import configureStore from 'configure/store'
import configureHistory from 'configure/history'

const store = configureStore()
const history = configureHistory(store)
const rootElement = document.getElementById('root')

render(
    <AppContainer>
        <Root store={store} history={history} />
    </AppContainer>,
    rootElement
)

if (module.hot) {
    module.hot.accept('components/Root', () => {
        const NextRoot = require('components/Root').default
        render(
            <AppContainer>
                <NextRoot store={store} history={history} />
            </AppContainer>,
            rootElement
        )
    })
}
