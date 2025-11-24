import { useState } from "react"

import { RoleContext } from "./roleContext.js"

const RoleProvider = ({ children }) => {

  const [ role, setRole ] = useState("MODERATOR")
  //useEffect para saber que rol

  return (
    <RoleContext.Provider value={role}>
      {children}
    </RoleContext.Provider>
  )
}

export default RoleProvider