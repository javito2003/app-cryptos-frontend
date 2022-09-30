import { ActionTypeUser } from "../action-types/user";
import { IUser } from '../../interfaces/User'

interface IAuth {
    type: ActionTypeUser.AUTH_SUCCESS,
    payload: {
        token: string
        user: IUser
    }
}

export type ActionUser =
    | IAuth