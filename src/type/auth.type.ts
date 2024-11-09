export default interface UserType {
  id: number
  username: string
  password: string
}

export default interface jwtPayload {
  exp: number
  username: string
}
