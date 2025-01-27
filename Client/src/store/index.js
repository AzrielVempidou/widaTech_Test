import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import { thunk } from 'redux-thunk'
import { rootReducers } from './reducer/rootReducers'
let store = createStore(rootReducers, applyMiddleware(thunk))

export default store