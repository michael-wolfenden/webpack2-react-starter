import { useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'
import { syncHistoryWithStore } from 'react-router-redux'

const configureHistory = (store) => {
    const hashHistoryWithoutQueryKey = useRouterHistory(createHashHistory)({
        queryKey: false,
    })

    return syncHistoryWithStore(hashHistoryWithoutQueryKey, store)
}

export default configureHistory
