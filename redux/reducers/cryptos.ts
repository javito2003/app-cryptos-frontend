import ICrypto from "../../interfaces/Cryptos"
import { ActionTypeCrypto } from "../action-types/cryptos"
import { ActionCrypto } from "../actions/cryptos"

type TInitialState = {
    cryptos: ICrypto[]
}

const initialState:TInitialState = {
    cryptos: []
}

export const cryptoReducer = (state = initialState, action: ActionCrypto) => {
    switch(action.type) {
        case ActionTypeCrypto.GET:
            return {
                ...state,
                cryptos: action.payload
            }
        default:
            return state
    }
}