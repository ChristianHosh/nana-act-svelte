export interface JwtToken {
    token: string,
    type: string,
    id: number,
    username: string,
    role: string
}