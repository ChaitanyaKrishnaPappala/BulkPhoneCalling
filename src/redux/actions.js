import axios from 'axios'

const client = axios.create({baseURL: 'http://localhost:3001'})

export const fetchNumbers = () => {
    return dispatch => {
        return client.get(`/numbers`)
            .then(res => {
                return dispatch({
                    type: 'FETCH_NUMBERS_SUCCESS',
                    numbers: res.data.data
                })
            })
            .catch(err => {
                return dispatch({type: 'FETCH_NUMBERS_FAILURE', error: err.response.data.message})
            })
    }
}

export const dial = () => {
    return dispatch => {
        return client.post(`/call`)
            .then(res => {
                return dispatch({
                    type: 'DIAL_SUCCESS',
                    numbers: res.data.message
                })
            })
            .catch(err => {
                return dispatch({type: 'DIAL_FAILURE', error: err.response.data.message})
            })
    }
}


export const updateNumbers = () => {
    return dispatch => {
        return client.put(`/status`)
            .then(res => {
                return dispatch({
                    type: 'FETCH_NUMBERS_SUCCESS',
                    numbers: res.data.data
                })
            })
            .catch(err => {
                return dispatch({type: 'FETCH_NUMBERS_FAILURE', error: err.response.data.message})
            })
    }
}
