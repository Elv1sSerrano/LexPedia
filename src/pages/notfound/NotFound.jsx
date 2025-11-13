import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div>
      <h1>Página no encontrada</h1>
      <Link to={"/"}>
        <button>Volver a inicio</button>
      </Link>
    </div>
  )
}

export default NotFound