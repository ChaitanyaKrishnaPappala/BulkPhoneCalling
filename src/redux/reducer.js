import {fromJS, Map} from 'immutable'

const reducer = (state = Map(), action) => {
    switch (action.type) {
        case 'FETCH_NUMBERS_SUCCESS':
            console.log('action.numbers', action.numbers)
            return state.setIn(['sundial', 'numbers'], fromJS(action.numbers))
        case 'UPDATE_NUMBERS_SUCCESS':
            console.log('action.numbers', action.numbers)
            return state.setIn(['sundial', 'numbers'], fromJS(action.numbers))
        case 'FETCH_NUMBERS_FAILURE':
            return state.setIn(['sundial', 'numbers', 'error'], action.error)
        case 'UPDATE_NUMBERS_FAILURE':
            return state.setIn(['sundial', 'numbers', 'error'], action.error)
        default:
            return state
    }
}

export default reducer
