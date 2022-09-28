import React, { useEffect, useState } from 'react'
import config from '../config'

interface IProp {
    method: string,
    url: string
    body?: any,
    token?: string
}


const useFetch = <T>(props: IProp) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [body, setBody] = useState<T | null>(null)

    useEffect(() => {
        const callApi = async() => {
            let fullUrl = `${config.api.url}/api` + props.url
            try {
                let response = await fetch(fullUrl, {
                    method: props.method,
                    headers: {
                        'Content-type': 'application/json'
                    },
                    mode: "cors",
                    body: JSON.stringify(props.body)
                })
                response = await response.json()
                setBody(response.body as T)
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        callApi()
    }, [])

    return {loading, error, body}
}

export default useFetch