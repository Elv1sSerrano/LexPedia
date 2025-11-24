import fotoPerfil from "@/assets/images/fotoPerfil.png"
import { caretDownPath } from "@/constants/iconPaths"
import Icon from "../utils/Icon"
import { useState } from "react"
import Modal from "../ui/Modal"
import { UserRoundPen, LogOut } from "lucide-react"
import { Link } from "react-router-dom"


const moderatorData = {
  fotoPerfil: fotoPerfil,
  name: "Admin",
}

const modaratorNavLinks = [
  {name: "Dashboard", direction: "dashboard"},
  {name: "Tabla", direction: "tabla"},
  {name: "Crear usuario", direction: "crear"},
  {name: "Articulos", direction: "articulos"},
]

const modalData = [
  {icon: <UserRoundPen /> , name: "Perfil", action: ""},
  {icon: <LogOut /> , name: "Cerrar Sesión", action: ""}
]

const AdminNavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  
  const handleOpenSettings = () => {
    setIsOpen(!isOpen)    
  }

  return (
    <nav className="sticky flex flex-row justify-between items-center gap-2 w-full h-18 bg-[#1787e0] p-4">
      <div className="flex flex-row">
        <p className="text-2xl font-semibold mr-8">📓 LexPedia</p>
        <ul className="flex flex-row gap-6 items-center">                  
          {modaratorNavLinks.map((item) => (
            <Link key={item.name} to={`/admin/${item.direction}`}>
              <li key={item.name} className="text-[#f1f7fe] font-medium">{item.name}</li>  
            </Link>
          ))}
        </ul>
      </div>                 
      <div className="relative flex flex-row gap-2 items-center">
        <img src={moderatorData.fotoPerfil} alt={moderatorData.name} className="w-10 rounded-full" />
        <p>{moderatorData.name}</p>
        <button className="cursor-pointer" onClick={handleOpenSettings}>
          <Icon width={24} height={24} paths={caretDownPath} color={"#fff"} />
        </button>
        { isOpen && <Modal fields={modalData} /> }
      </div>                   
    </nav>
  )
}

export default AdminNavBar