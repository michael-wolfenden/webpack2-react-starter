/* eslint-disable global-require */
import { createStore, compose } from 'redux'

import rootReducer from 'configure/reducer'

const initialRootState = {}

const configureStore = (initialState = initialRootState) => {
    let storeEnhancers = []

    if (process.env.NODE_ENV !== 'production') {
        const devTools = window.devToolsExtension
            ? window.devToolsExtension()
            : f => f

        storeEnhancers = [devTools]
    } else {
        storeEnhancers = []
    }

    const store = createStore(
        rootReducer,
        initialState,
        compose(...storeEnhancers)
    )

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('configure/reducer', () => {
            const { reducer: nextReducer } = require('configure/reducer')
            store.replaceReducer(nextReducer)
        })
    }

    return store
}

export default configureStore

