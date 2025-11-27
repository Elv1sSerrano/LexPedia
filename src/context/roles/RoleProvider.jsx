import { useState } from "react"

import { AuthContext, AuthToggleContext, RoleContext, RoleToggleContext, SavedArticlesContext, SavedArticlesToggleContext, UserIdContext, UserIdToggleContext } from "./roleContext.js"

const RoleProvider = ({ children }) => {

  const [ role, setRole ] = useState("")
  const [ id, setId ] = useState(null)
  const [ auth, setAuth ] = useState(false)
  const [ savedArticles, setSavedArticles ] = useState([])

  return (
    <RoleContext.Provider value={role}>
      <RoleToggleContext.Provider value={setRole}>
        <UserIdContext.Provider value={id}>
          <UserIdToggleContext.Provider value={setId}>
            <AuthContext.Provider value={auth}>
              <AuthToggleContext.Provider value={setAuth}>
                <SavedArticlesContext.Provider value={savedArticles}>
                  <SavedArticlesToggleContext.Provider value={setSavedArticles}>
                    {children}
                  </SavedArticlesToggleContext.Provider>                  
                </SavedArticlesContext.Provider>                  
              </AuthToggleContext.Provider>
            </AuthContext.Provider>
          </UserIdToggleContext.Provider>
        </UserIdContext.Provider>
      </RoleToggleContext.Provider>
    </RoleContext.Provider>
  )
}

export default RoleProvider