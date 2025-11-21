import UserNavBar from "@/components/layout/UserNavBar"
import { Outlet } from "react-router-dom"

const UserLayout = () => {
  return (
    <section>      
      <UserNavBar />  
      <Outlet />
    </section>
  )
}

export default UserLayout