import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const UserProfile = () => {

  const { id } = useParams()
  const [userData, setUserData] = useState(null) 

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/usuarios/${id}`)
        setUserData(response.data)
      } catch (err) {
        console.error(`No se ha encontrado el usuario ${err}`)
      }
    }

    fetchUser()

  }, [id])

  if(!userData) return <h1>Cargando usuario...</h1>

  return (
    <div className="flex flex-col gap-2">
      <h2>Nombre</h2>
      <p>{userData.firstName}</p>
      <h2>Apellido</h2>
      <p>{userData.lastName}</p>
      <h2>Correo</h2>
      <p>{userData.email}</p>
    </div>
  )
}

export default UserProfile