import { IUser } from "../../interfaces/User"
import { ActionTypeUser } from "../action-types/user"
import { ActionUser } from "../actions/user"

type TInitialState = {
    user: IUser | null,
    token: string
    isLogged: boolean
}

const initialState: TInitialState = {
    isLogged: false,
    token: "",
    user: null
}

export const userReducer = (state = initialState, action: ActionUser) => {
    switch (action.type) {
        case ActionTypeUser.AUTH_SUCCESS:
            return {
                ...state,
                isLogged: true,
                token: action.payload.token,
                user: action.payload.user
            }
        default:
            return state
    }
}