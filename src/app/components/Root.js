import React, { PropTypes } from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'

import routes from 'configure/routes'

const Root = ({ store, history }) => (
    <Provider store={store}>
        <Router routes={routes} history={history} />
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

export default Root
