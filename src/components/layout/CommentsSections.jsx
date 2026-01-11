import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import {
  MessageCircle,
  ThumbsUp,
  ThumbsDown,  
  Bold,
  Italic,
  Underline,    
  Smile,  
} from "lucide-react"
import { useUserIdContext } from "@/context/roles/roleContext"
import axios from "axios"
import { useParams } from "react-router-dom"
import fotoPerfil from "../../assets/images/fotoPerfil.png"
import { toast } from "react-toastify"

const CommentsSection = ({ refreshComments }) => {

  const userId = useUserIdContext()
  const { articuloId } = useParams()

  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [sortBy, setSortBy] = useState("recent")

  // Obtiene comentarios del backend
  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/comentarios/${articuloId}`)
      setComments(res.data)
    } catch (err) {
      console.error("Error al obtener comentarios", err)
    }
  }

  // Envía nuevo comentario
  const handleSubmit = async () => {
    try {
      await axios.post(`http://localhost:8080/api/comentarios/${articuloId}`, {        
        articleId: articuloId,
        userId: userId,
        text: newComment,
        parentId: null        
      })

      toast.success("Comentario publicado exitosamente")
      setNewComment("")
      fetchComments()
      refreshComments && refreshComments()

    } catch (err) {
      toast.error("Ha ocurrido un problema al publicar el comentario")
      console.error("Error al enviar comentario", err)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchComments()
  }, [])

  return (
    <div className="w-full max-w-3xl mx-auto py-8">

      {/* Caja para escribir comentario */}
      <div className="mb-8">
        <div className="bg-muted rounded-lg p-6 mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Añadir comentario ..."
            className="w-full bg-muted text-foreground placeholder-muted-foreground resize-none focus:outline-none text-base mb-4"
            rows={3}
          />

          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <Bold className="w-5 h-5 text-muted-foreground" />
              <Italic className="w-5 h-5 text-muted-foreground" />
              <Underline className="w-5 h-5 text-muted-foreground" />
              <Smile className="w-5 h-5 text-muted-foreground" />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!newComment.trim()}
              className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-8"
            >
              Subir
            </Button>
          </div>
        </div>
      </div>

      {/* Título */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold">Comentarios</h3>
          <span className="bg-orange-600 text-white text-xs font-semibold rounded-full px-3 py-1">
            {comments.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-muted-foreground" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-foreground text-sm border-0 focus:outline-none cursor-pointer"
          >
            <option value="recent">Más recientes</option>
            <option value="popular">Más popular</option>
            <option value="oldest">Más antiguos</option>
          </select>
        </div>
      </div>

      {/* Lista de comentarios */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">

            {/* Avatar */}
            <img
              src={fotoPerfil}
              alt={comment.author?.firstName}
              className="w-10 h-10 rounded-full shrink-0 object-cover"
            />

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">{comment.author?.firstName} {comment.author?.lastName}</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              </div>

              <p className="mb-3">{comment.text}</p>

              <div className="flex items-center gap-4">
                <button className="text-muted-foreground hover:text-foreground flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                </button>

                <button className="text-muted-foreground hover:text-foreground flex items-center gap-1">
                  <ThumbsDown className="w-4 h-4" />
                </button>

                <button className="text-sm text-muted-foreground hover:text-foreground">
                  Responder
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default CommentsSection
