import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { getTokenSourceMapRange } from "typescript"

export default function api(path: string, method: 'get' | 'post' | 'put', body: any | undefined ) {

    return new Promise((resolve) => {
        const reqData = {
            method: method,
            url: path,
            baseURL: 'http://localhost:3000',
            data: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getToken()
            }
        }
        axios(reqData)
        .then(res => responseHandler(res, resolve, reqData))
        .catch(err => {
            const resp: ApiResponse = {
                status: 'error',
                data: err
            }
        })
    })
    

}

interface ApiResponse {
    status: 'ok' | 'error' | 'login';
    data: any;
}

function responseHandler(res: AxiosResponse<any>, resolve: (value: unknown) => void, reqData: AxiosRequestConfig) {

    if(res.status < 200 || res.status >= 300) {

        if(res.status === 401) {
            refreshToken(reqData, resolve)
        }

        const response: ApiResponse = {
            status: 'error',
            data: res.data
        }
        return resolve(response)
    }

    if(res.data.status < 0) {
        const response: ApiResponse = {
            status: 'ok',
            data: res.data
        }
        return resolve(response)
    }

    resolve(res.data);
}

function getToken(): string {
    const token = localStorage.getItem('api_token');
    return 'Bearer ' + token;
}

function saveToken(token: string) {
    localStorage.setItem('api_token', token)
}

function refreshToken(reqData: AxiosRequestConfig, resolve: (value: unknown) => void): string | null {
    return 'test';
}