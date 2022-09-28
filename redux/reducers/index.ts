import { combineReducers } from 'redux'
import { cryptoReducer } from './cryptos'

const reducers = combineReducers({
    cryptos: cryptoReducer
})

export default reducers