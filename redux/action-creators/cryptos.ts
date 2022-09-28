import { Dispatch } from "redux";
import { ActionCrypto } from "../actions/cryptos";
import { ActionTypeCrypto } from "../action-types/cryptos";
import { IResponse } from "../../interfaces/Responses";
import ICrypto from "../../interfaces/Cryptos";
import config from '../../config'

type TDispatch = Dispatch<ActionCrypto>

export const getCryptos = () => async(dispatch: TDispatch) => {
    try {
        let fullUrl = `${config.api.url}/api/cryptos`
        fetch(fullUrl, {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then((data: IResponse<ICrypto[]>) => {
            dispatch({ type: ActionTypeCrypto.GET, payload: data.body })
        }) 
        .catch(err => {
            console.log(err)
        })
    } catch (error) {
        console.log(error);
    }
}