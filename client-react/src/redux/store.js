import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'

import moviesReducers from './reducers/movies-reducers'
import usersReducers from './reducers/users-reducers'

const initialState = {}
const middleware = [thunk]
const combinedReducers = combineReducers({
    movies: moviesReducers,
    users: usersReducers
})

const store = createStore(
    combinedReducers,
    initialState,
    applyMiddleware(...middleware)
)

export default store
