import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const AllUsers = () => {  

  const [usersData, setUsersData] = useState(null)

  useEffect(() => {

    const fetchData = async () => {
      const response = await axios.get("http://localhost:8080/api/usuarios")
      setUsersData(response.data)
    }

    fetchData()

  }, [])

  if (!usersData) return <h1 className="text-center text-4xl items-center">Cargando datos de los usuarios...</h1>

  return (
    <div className="flex flex-col gap-2 items-center">
      <h1 className="text-4xl mb-4">Los datos de los usarios son:</h1>
      {
        usersData.map((user) => (
          <div className="flex flex-row gap-3 border-2 p-4 rounded-2xl items-center">
            <p>{`Nombre: ${user.firstName}`}</p>
            <p>{`Apellido: ${user.lastName}`}</p>
            <p>{`Correo: ${user.email}`}</p>
            <Link to={`/actualizar/${user.id}`}>
              <button className="p-2 bg-blue-500 hover:bg-blue-600 cursor-pointer">🔧</button>
            </Link>
          </div>
        ))
      }
    </div>
  )
}

export default AllUsers