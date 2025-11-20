import { caretDownPath } from "../constants/iconPaths"
import Icon from "./Icon"
import fotoPerfil from "../assets/images/fotoPerfil.png"

const userData = [
  {id: 1, name: "Elvis", email: "elvis@gmail.com", passwordHash: "adfasfasf", fechaRegistro: new Date("2025-11-19T21:54:00"), estado: "activo", articulosGuardados: []}
]

const userNavBar = [
  {name: "Inicio"},
  {name: "Buscar"},
  {name: "Guardados"},
]

const NavBar = () => {  

  return (
    <header className="sticky flex flex-row justify-between items-center gap-2 w-full h-18 bg-[#1787e0] p-4">
      <div className="flex flex-row">
        <p className="text-2xl font-semibold mr-8">📓 LexPedia</p>
        <ul className="flex flex-row gap-6 items-center">                  
          {userNavBar.map((item) => (
            <li className="text-[#f1f7fe] font-medium">{item.name}</li>  
          ))}
        </ul>
      </div>      
      {
        userData.map((user, index) => (
          <div key={index} className="flex flex-row gap-2 items-center">
            <img src={fotoPerfil} alt={user.name} className="w-10 rounded-full" />
            <p>{user.name}</p>
            <Icon width={24} height={24} paths={caretDownPath} color={"#fff"} />
          </div>
        ))
      }      
    </header>
  )
}

export default NavBar