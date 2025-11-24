import { createContext, useContext } from "react"

export const UserIdContext = createContext()

export const UserIdToggleContext = createContext()

export const RoleContext = createContext()

export const RoleToggleContext = createContext()

export const AuthContext = createContext()

export const AuthToggleContext = createContext()

export function useUserIdContext() {
  return useContext(UserIdContext)
}

export function useUserIdToggleContext() {
  return useContext(UserIdToggleContext)
}

export function useRoleContext() {
  return useContext(RoleContext)
}

export function useRoleToggleContext() {
  return useContext(RoleToggleContext)
}

export function useAuthContext() {
  return useContext(AuthContext)
}

export function useAuthToggleContext() {
  return useContext(AuthToggleContext)
}