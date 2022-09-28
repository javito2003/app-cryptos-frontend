import ICrypto from "../../interfaces/Cryptos";
import { ActionTypeCrypto } from "../action-types/cryptos";

interface IGet {
    type: ActionTypeCrypto.GET,
    payload: ICrypto[]
}

export type ActionCrypto = 
    | IGet