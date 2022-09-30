import { combineReducers } from 'redux'
import { cryptoReducer } from './cryptos'
import { userReducer } from './user'

const reducers = combineReducers({
    cryptos: cryptoReducer,
    user: userReducer
})

export default reducers