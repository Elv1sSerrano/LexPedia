import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <section className="flex flex-col justify-center items-center h-screen gap-4">
      <h1 className="text-4xl font-bold">Página no encontrada</h1>
      <Link to={"/"}>
        <button className="rounded-xl p-4 bg-[#0a549a] text-2xl cursor-pointer">Volver a inicio</button>
      </Link>
    </section>
  )
}

export default NotFound