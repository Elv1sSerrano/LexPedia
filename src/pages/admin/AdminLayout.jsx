import AdminNavBar from "@/components/layout/AdminNavBar"
import { Outlet } from "react-router-dom"

const AdminLayout = () => {
  return (
    <>
      <AdminNavBar />
      <Outlet />
    </>
  )
}

export default AdminLayout