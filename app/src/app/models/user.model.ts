export interface UserModel {
  id: number | string
  name: string
  role: 'Admin' | 'User'
  email: string
  protectedProjects: number
}
