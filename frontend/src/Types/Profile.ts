import { UserProps } from "./User"

export type Profileprops = {
  userData: UserProps 
  isOwnProfile: boolean
  onSave: (data: UserProps) => void 
}