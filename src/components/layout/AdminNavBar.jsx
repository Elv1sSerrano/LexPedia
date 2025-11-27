import { caretDownPath } from "../../constants/iconPaths"
import Icon from "../utils/Icon"
import fotoPerfil from "@/assets/images/fotoPerfil.png"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import Modal from "../ui/Modal"
import { LogOut, UserRoundPen } from "lucide-react"
import axios from "axios"
import { useAuthToggleContext, useRoleToggleContext, useUserIdContext, useUserIdToggleContext } from "@/context/roles/roleContext"
import Loader from "../ui/Loader"


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

const AdminNavBar = () => {

  const setId = useUserIdToggleContext()
  const setAuth = useAuthToggleContext()
  const setRole = useRoleToggleContext()
  const id = useUserIdContext()  

  const [userData, setUserData] = useState(null)
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
  
  if(!userData) return <Loader />

  const nada = () => {

  }
  
  const logOut = () => {
    setId(null)
    setAuth(false)
    setRole("")
  }  

  const modalData = [
    {icon: <UserRoundPen /> , name: "Perfil", action: nada},
    {icon: <LogOut /> , name: "Cerrar Sesión", action: logOut}
  ]
  
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