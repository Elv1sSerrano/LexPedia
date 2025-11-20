import { Link } from "react-router-dom"
import imagenRegistro from "../../assets/images/imagenRegistro.jpg"

const Register = () => {

  const registerFields = [
    {name: "Nombre", type: "text"},
    {name: "Correo", type: "email"},
    {name: "Contraseña", type: "password"},
    {name: "Confirmar contraseña", type: "password"},
  ]

  return (
    <section className="grid grid-cols-2 h-screen">
      <article className="col-span-1 flex flex-col gap-2 items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Crea una cuenta</h1>

        <form className="flex flex-col gap-3 w-1/2">
          {
            registerFields.map((field) => (
              <fieldset className="flex flex-col gap-1">
                <label>{field.name}</label>
                <input className="focus:outline-0 border px-2 py-1 rounded-md" type={field.type}/>
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