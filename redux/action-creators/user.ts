import { Dispatch } from "redux"
import { IAuthParam, IUser } from "../../interfaces/User"
import { getData, saveData } from "../../utils/asyncStorage"
import customFetch from "../../utils/customFetch"
import { ActionTypeUser } from "../action-types/user"
import { ActionUser } from "../actions/user"
import { State } from "../store"

type TDispatch = Dispatch<ActionUser>

export const checkLogged = () => async(dispatch: TDispatch, getState: () => State) => {
    try {
        let user = getState().user.user
        const token = await getData('token', 'string')
        if(token && user === null) {
            let { body, error } = await customFetch<IUser>({ method: "GET", url: "/user/token", token: `Bearer ${token}` })
            if(!error) {
                dispatch({ type: ActionTypeUser.AUTH_SUCCESS, payload: { user: body, token } })
            } else {
                console.log(body)
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export const AuthSuccess = (data: IAuthParam) => async(dispatch:TDispatch) => {
    try {
        await saveData('token', data.token)
        dispatch({ type: ActionTypeUser.AUTH_SUCCESS, payload: data })
    } catch (error) {
        console.log(error);
    }
}
