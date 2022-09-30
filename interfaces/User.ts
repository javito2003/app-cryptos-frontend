export interface IUser {
    name: string
    email: string
    Id: number
}

export interface IAuthParam {
    token: string
    user: IUser
}