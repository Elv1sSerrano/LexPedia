import { caretDownPath } from "../../constants/iconPaths"
import Icon from "../utils/Icon"
import fotoPerfil from "@/assets/images/fotoPerfil.png"
import { Link, Navigate } from "react-router-dom"
import { useState } from "react"
import Modal from "../ui/Modal"
import { LogOut, UserRoundPen } from "lucide-react"

const userData = [
  {id: 1, name: "Elvis", email: "elvis@gmail.com", passwordHash: "adfasfasf", fechaRegistro: new Date("2025-11-19T21:54:00"), estado: "activo", articulosGuardados: []}
]

const userNavBar = [
  {name: "inicio", direction: ""},  
  {name: "Guardados", direction: "guardados"},
]

const logOut = () => {

  
}

const modalData = [
  {icon: <UserRoundPen /> , name: "Perfil", action: ""},
  {icon: <LogOut /> , name: "Cerrar Sesión", action: logOut}
]

const UserNavBar = () => {  

  const [isOpen, setIsOpen] = useState(false)

  const handleOpenSettings = () => {
    setIsOpen(!isOpen)    
  }

  

  return (
    <nav className="sticky flex flex-row justify-between items-center gap-2 w-full h-18 bg-[#1787e0] p-4">
      <div className="flex flex-row">
        <p className="text-2xl font-semibold mr-8">📓 LexPedia</p>
        <ul className="flex flex-row gap-6 items-center">                  
          {userNavBar.map((item) => (
            <Link key={item.name} to={`${item.direction}`}>
              <li key={item.name} className="text-[#f1f7fe] font-medium">{item.name}</li>  
            </Link>
          ))}
        </ul>
      </div>      
      {
        userData.map((user, index) => (
          <div key={index} className="relative flex flex-row gap-2 items-center">
            <img src={fotoPerfil} alt={user.name} className="w-10 rounded-full" />
            <p>{user.name}</p>
            <button className="cursor-pointer" onClick={handleOpenSettings}>
              <Icon width={24} height={24} paths={caretDownPath} color={"#fff"} />
            </button>
            { isOpen && <Modal fields={modalData} /> }
          </div>
        ))
      }      
    </nav>
  )
}

export default UserNavBar