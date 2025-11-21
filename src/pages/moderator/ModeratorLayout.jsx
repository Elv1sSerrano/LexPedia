import ModeratorNavBar from "@/components/layout/ModeratorNavBar"
import { Outlet } from "react-router-dom"

const ModeratorLayout = () => {
  return (
    <div>
      <ModeratorNavBar />
      <Outlet />
    </div>
  )
}

export default ModeratorLayout