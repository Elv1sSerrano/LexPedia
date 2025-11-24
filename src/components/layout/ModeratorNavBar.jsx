import fotoPerfil from "@/assets/images/fotoPerfil.png"
import { caretDownPath } from "@/constants/iconPaths"
import Icon from "../utils/Icon"
import { useEffect, useState } from "react"
import Modal from "../ui/Modal"
import { UserRoundPen, LogOut } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuthToggleContext, useRoleToggleContext, useUserIdContext, useUserIdToggleContext } from "@/context/roles/roleContext"
import axios from "axios"
import Loader from "../ui/Loader"

const ModeratorNavBar = () => {

  const id = useUserIdContext()
  const setId = useUserIdToggleContext()
  const setAuth = useAuthToggleContext()
  const setRole = useRoleToggleContext()
  
  const logOut = () => {
    setId(null)
    setAuth(false)
    setRole("")
  }

  const nada = () => {

  }

  const modaratorNavLinks = [
    {name: "Tareas", direction: "tasks"},
    {name: "Crear artículo", direction: "create"},
    {name: "Artículos", direction: "articulos"},
  ]

  const modalData = [
    {icon: <UserRoundPen /> , name: "Perfil", action: nada},
    {icon: <LogOut /> , name: "Cerrar Sesión", action: logOut}
  ]

  const [ userData, setUserData ] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {

    if (!id) return
    
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/usuarios/${id}`)
        setUserData(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()

  }, [id])
  
  const handleOpenSettings = () => {
    setIsOpen(!isOpen)    
  }

  if(!userData) return <Loader />

  return (
    <nav className="sticky flex flex-row justify-between items-center gap-2 w-full h-18 bg-[#1787e0] p-4">
      <div className="flex flex-row">
        <p className="text-2xl font-semibold mr-8">📓 LexPedia</p>
        <ul className="flex flex-row gap-6 items-center">                  
          {modaratorNavLinks.map((item) => (
            <Link key={item.name} to={`/moderator/${item.direction}`}>
              <li key={item.name} className="text-[#f1f7fe] font-medium">{item.name}</li>  
            </Link>
          ))}
        </ul>
      </div>                 
      <div className="relative flex flex-row gap-2 items-center">
        <img src={fotoPerfil} alt={userData.firstName} className="w-10 rounded-full" />
        <p>{userData.firstName}</p>
        <button className="cursor-pointer" onClick={handleOpenSettings}>
          <Icon width={24} height={24} paths={caretDownPath} color={"#fff"} />
        </button>
        { isOpen && <Modal fields={modalData} /> }
      </div>                   
    </nav>
  )
}

export default ModeratorNavBar