export interface UserLoginInput {
  email: string,
  password: string
}

export interface JwtPayload {
  userId: string,
  email: string
}