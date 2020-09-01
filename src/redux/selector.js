import {createStructuredSelector} from 'reselect'
import {List} from 'immutable'

export const selector = createStructuredSelector({
    numbers: (state) => state.getIn(['sundial', 'numbers'], List()),
})
