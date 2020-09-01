import {Map} from 'immutable'
import {createStore, applyMiddleware, compose} from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'

const middlewares = [thunk]

export default createStore(
    reducer,
    Map(),
    compose(
        applyMiddleware(...middlewares),
        window && window.devToolsExtension ? window.devToolsExtension() : f => f
    )
)
