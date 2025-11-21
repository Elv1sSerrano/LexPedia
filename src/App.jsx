import { Outlet, useLocation } from "react-router-dom"
import NavBar from "./components/NavBar"

function App() {

  const location = useLocation()  
  const currentLocation = location.pathname
  const unvalidLocations = ["login", "registro"]

  const showNavBar = !unvalidLocations.includes(currentLocation)

  return (
    <main>
      {showNavBar && <NavBar />}
      <Outlet />
    </main>
  )
}

export default App
