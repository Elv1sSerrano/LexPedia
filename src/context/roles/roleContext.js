import { createContext, useContext } from "react"

export const RoleContext = createContext()

export function useRoleContext() {
  return useContext(RoleContext)
}