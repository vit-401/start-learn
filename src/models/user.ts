export type User = {
  email: string,
  password: string,
  hashedPassword: string,
  saltPassword: any,
  dateCreated: Date
}