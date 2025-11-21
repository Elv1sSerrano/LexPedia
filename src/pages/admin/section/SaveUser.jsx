import axios from "axios"
import { useState } from "react"
import RegisterFormField from "../../user/components/RegisterFormField"

const SaveUser = () => {

  const [firstName, setfirstName] = useState("")
  const [lastName, setlastName] = useState("")
  const [email, setEmail] = useState("")

  const formFields = [
    { title: "Primer Nombre", value: firstName, setter: setfirstName, placeholder: "Ingrese su nombre" },
    { title: "Apellido", value: lastName, setter: setlastName, placeholder: "Ingrese su apellido" },
    { title: "Correo electrónico", value: email, setter: setEmail, placeholder: "Ingrese su correo electrónico" },
  ]

  function handleSubmit(e) {
    e.preventDefault()

    const userDto = {
      firstName: firstName,
      lastName: lastName,
      email: email
    }

    axios.post("http://localhost:8080/api/usuarios", userDto)
    .then(response => {
      console.log(`Usuario guardado con el id ${response.data.id}`)
      setfirstName("")
      setlastName("")
      setEmail("")
    })
    .catch(error => {
      console.error(`No se ha podido guardar el usuario, código de error ${error.response.data}`)
    })
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form className="flex flex-col gap-2 items-center" onSubmit={handleSubmit}>
        {
          formFields.map((field, index) => (
            <RegisterFormField key={index} {...field} />
          ))
        }
        <button className="p-4 rounded-2xl bg-amber-600 hover:bg-amber-500 active:bg-amber-200 cursor-pointer" type="submit">Guardar usuario</button>
      </form>
    </div>
  )
}

export default SaveUser

