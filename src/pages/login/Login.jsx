import { Link, useNavigate } from "react-router-dom"
import imagenLogin from "../../assets/images/imgLogin.jpg"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useAuthToggleContext, useRoleToggleContext, useUserIdToggleContext } from "@/context/roles/roleContext"

const Login = () => {

  const setId = useUserIdToggleContext()
  const setRole = useRoleToggleContext()
  const setAuth = useAuthToggleContext()

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {

    e.preventDefault()

    if (email === "" || password === "" ) return toast.warning("No pueden haber campos vacíos")

    const dto = {
      email: email,
      password: password
    }
    
    await axios.post("http://localhost:8080/api/usuarios/login", dto)    
    .then((response) => {
      toast.success("Sesión iniciada correctamente")
      setId(response.data.id)
      setRole(response.data.role)
      setAuth(true)
      navigate("/")
    })
    .catch((err) => {
      toast.error("El correo o la contraseña son incorrectos")
      console.log(err)
    })
  }   


  return (
    <section className="grid grid-cols-8">
      <aside className="col-span-3">
        <img src={imagenLogin} className="h-full object-cover object-left opacity-70" />
      </aside>
      <article className="col-span-5 flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Bienvenido a LexPedia</h1>
        <p className="m-4">Explora grandes cantidades de artículos de caracter jurídico</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-3 w-1/2">
          <fieldset className="flex flex-col gap-1 border-2 rounded-lg px-2 py-0.5">
            <label className="opacity-75" htmlFor="correo">Correo</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="focus:outline-0" type="email"/>
          </fieldset>
          <fieldset className="flex flex-col gap-1 border-2 rounded-lg px-2 py-0.5">
            <label className="opacity-75" htmlFor="contraseña">Contraseña</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className="focus:outline-0" type="password"/>
          </fieldset>
          <button className="rounded-2xl bg-[#0c4880] border-0 p-2 cursor-pointer text-xl">Iniciar sesión</button>
        </form>

        <p className="mt-4">No tienes una cuenta? <Link to={"/registro"} className="text-[#40a3f0] hover:underline">Regístrate aquí</Link></p>
      </article>
    </section>
  )
}

export default Login