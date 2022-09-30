import config from '../config'
import { IResponse } from '../interfaces/Responses'

interface IProp {
    method: string,
    url: string
    body?: any,
    token?: string
}

type CustomResponse<A> = IResponse<A> & Response 

function instaceOfIresponse<A>(object: any): object is IResponse<A> {
    return 'error' in object
}

export default async function<T = string>({ method, url, body, token }: IProp) {
    let fullUrl = `${config.api.url}/api${url}`
    let toReturn: IResponse<T>
    try {
        let response = await fetch(fullUrl, {
            method,
            headers: {
                'Content-type': 'application/json',
                'authorization': token || ""
            },
            mode: "cors",
            body: JSON.stringify(body)
        })
        response = await response.json() 
        response = response as CustomResponse<T>
        
        if(instaceOfIresponse<T>(response)) {
            if(!response.error) {
                toReturn = {
                    body: response.body as T,
                    error: false,
                    status: response.status
                }
            } else {
                toReturn = {
                    body: response.body as T,
                    error: true,
                    status: 500
                }
            }
        } else {
            toReturn = {
                body: response.body as T,
                error: true,
                status: 500
            }
        }
    } catch (error) {
        toReturn = {
            body: error as any,
            error: true,
            status: 500
        }
    }

    return toReturn
}