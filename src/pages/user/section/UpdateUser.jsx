import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import RegisterFormField from "../components/RegisterFormField"

const UpdateUser = () => {
  
  const { id } = useParams()

  const [userData, setUserData] = useState(null)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")

  const formFields = [
    { title: "Primer Nombre", value: firstName, setter: setFirstName, placeholder: "Ingrese su nombre" },
    { title: "Apellido", value: lastName, setter: setLastName, placeholder: "Ingrese su apellido" },
    { title: "Correo electrónico", value: email, setter: setEmail, placeholder: "Ingrese su correo electrónico" },
  ]  

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:8080/api/usuarios/${id}`)
      const data = response.data      
      setUserData(data)
      setFirstName(data.firstName)
      setLastName(data.lastName)
      setEmail(data.email)
    }
    fetchData()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const userDto = {      
      firstName: firstName,
      lastName: lastName,
      email: email
    }  

    axios.put(`http://localhost:8080/api/usuarios/${id}`, userDto)
      .then((response) => {
        console.log(`Usuario actualizado ${response}`)
      })
      .catch((err) => {
        console.error(`No se ha podido actualizar el usuario ${err}`)
      })
  }

  if (!userData) return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold">Obteniendo datos anteriores...</h1>
    </div>
  )

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-4">Actualizar datos</h1>
      <form className="flex flex-col gap-2 items-center" onSubmit={handleSubmit}>        
        {
          formFields.map((field, index) => (
            <RegisterFormField key={index} {...field} />
          ))
        }
        <button className="p-4 rounded-2xl bg-amber-600 hover:bg-amber-500 active:bg-amber-200 cursor-pointer" type="submit">Actualizar datos</button>
      </form>
    </div>
  )
}

export default UpdateUser