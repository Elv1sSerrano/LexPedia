import { Link, useNavigate } from "react-router-dom"
import imagenRegistro from "../../assets/images/imagenRegistro.jpg"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

const Register = () => {

  const navigate = useNavigate()

  const [ firstName, setFirstName ] = useState("")
  const [ lastName, setLastName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ confirmPassword, setConfirmPassword ] = useState("")  

  const registerFields = [
    {name: "Primer nombre", type: "text", value: firstName, setter: setFirstName},
    {name: "Apellido", type: "text", value: lastName, setter: setLastName},
    {name: "Correo", type: "email", value: email, setter: setEmail},
    {name: "Contraseña", type: "password", value: password, setter: setPassword},
    {name: "Confirmar contraseña", type: "password", value: confirmPassword, setter: setConfirmPassword},
  ]

  const handleSubmit = (e) => {
    
    e.preventDefault()
    
    if (firstName === "" || lastName === "" || email === "" || password === "" || confirmPassword === "") return toast.warning("No pueden haber campos vacíos")

    if (password !== confirmPassword ) return toast.warning("Las contraseñas no coinciden")

    const userDto = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }

    axios.post("http://localhost:8080/api/usuarios", userDto)
    .then(() => {
      setFirstName("")
      setLastName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      toast.success("Cuenta creada exitosamente")
      navigate("/", { replace: true })
    })
    .catch(err => {
      console.log(`No se ha podido crear el usuario, error: ${err}`)
    })
  }

  return (
    <section className="grid grid-cols-2 h-screen">
      <article className="col-span-1 flex flex-col gap-2 items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Crea una cuenta</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-1/2">
          {
            registerFields.map((field) => (
              <fieldset className="flex flex-col gap-1">
                <label>{field.name}</label>
                <input value={field.value} onChange={(e) => field.setter(e.target.value)} className="focus:outline-0 border px-2 py-1 rounded-md" type={field.type}/>
              </fieldset>
            ))
          }        
          <button className="rounded-md bg-[#0c4880] border-0 p-2 cursor-pointer text-xl mt-3">Registrarse</button>  
        </form>

        <p className="mt-4">Ya tienes una cuenta? <Link to={"/login"} className="text-[#40a3f0]">Inicia Sesión</Link></p>
      </article>
      <aside className="col-span-1 p-4">
        <img src={imagenRegistro} className="h-full object-cover opacity-70 rounded-xl" />          
      </aside>
    </section>
  )
}

export default Register