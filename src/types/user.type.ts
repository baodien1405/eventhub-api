export interface User {
  fullName: string
  email: string
  password: string
  avatar: string
}

export interface QueryUserParams {
  // limit: number
  // sort: string
  // page: number
  // filter: any
  select: string[]
}
