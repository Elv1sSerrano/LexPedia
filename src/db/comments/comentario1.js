import fotoPerfil from "../../assets/images/fotoPerfil.png"
import respuesta1 from "../replies/respuesta1"

const comentario1 = {
  id: "comentario1",
  articleId: "articulo269f", 
  avatar: fotoPerfil,
  author: "Julian Padilla",
  text: "Buena información",
  timestamp: new Date().toLocaleDateString(),
  likes: 2,
  dislikes: 0,
  replies: [
    respuesta1
  ]
}

export default comentario1