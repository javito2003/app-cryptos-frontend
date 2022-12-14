import { TypedUseSelectorHook } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

const generateStore = () => {
    const store = createStore(reducers, {}, applyMiddleware(thunk))
    return store
}

const store = generateStore()

type AppDispatch = typeof store.dispatch
export type State = ReturnType<typeof reducers>

export const useAppSelector: TypedUseSelectorHook<State> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store