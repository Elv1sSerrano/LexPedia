import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  Bold,
  Italic,
  Underline,
  Paperclip,
  ImageIcon,
  Smile,
  AtSign,
} from "lucide-react"

const CommentsSection = ({comments}) => {

  const [newComment, setNewComment] = useState("")
  const [sortBy, setSortBy] = useState("recent")

  const handleSubmit = () => {

  }

  const toggleVote = (commentId) => {
    const comment = commentId
    console.log(comment)
  }

  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      {/* Comment Input */}
      <div className="mb-8">
        <div className="bg-muted rounded-lg p-6 mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Añadir comentario ..."
            className="w-full bg-muted text-foreground placeholder-muted-foreground resize-none focus:outline-none text-base mb-4"
            rows={3}
          />

          {/* Toolbar */}
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <button className="p-2 hover:bg-background rounded transition-colors" title="Bold">
                <Bold className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="p-2 hover:bg-background rounded transition-colors" title="Italic">
                <Italic className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="p-2 hover:bg-background rounded transition-colors" title="Underline">
                <Underline className="w-5 h-5 text-muted-foreground" />
              </button>              
              <button className="p-2 hover:bg-background rounded transition-colors" title="Emoji">
                <Smile className="w-5 h-5 text-muted-foreground" />
              </button>              
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

      {/* Divider */}
      <div className="border-t border-border mb-6" />

      {/* Comments Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold">Comentarios</h3>
          <span className="bg-orange-600 text-white text-xs font-semibold rounded-full px-3 py-1">{comments.length}</span>
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

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            {/* Avatar */}
            <img
              src={comment.avatar || "/placeholder.svg"}
              alt={comment.author}
              className="w-10 h-10 rounded-full shrink-0 object-cover"
            />

            <div className="flex-1 min-w-0">
              {/* Author and Time */}
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-foreground">{comment.author}</span>
                {comment.verified && (
                  <span className="text-orange-600" title="Verified">
                    ✓
                  </span>
                )}
                <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
              </div>

              {/* Comment Text */}
              <p className="text-foreground mb-3 leading-relaxed">{comment.text}</p>

              {/* Interactions */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleVote(comment.id, "up")}
                  className={`flex items-center gap-1 text-sm transition-colors ${
                    "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{comment.likes}</span>
                </button>

                <button
                  onClick={() => toggleVote(comment.id, "down")}
                  className={`flex items-center gap-1 text-sm transition-colors ${
                    "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ThumbsDown className="w-4 h-4" />
                  <span>{comment.dislikes}</span>
                </button>

                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">Responder</button>
                
              </div>

              {/* Nested Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 space-y-4 pl-4 border-l border-border">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex gap-3">
                      <img
                        src={reply.avatar || "/placeholder.svg"}
                        alt={reply.author}
                        className="w-8 h-8 rounded-full shrink-0 object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm text-foreground">{reply.author}</span>
                          {reply.verified && (
                            <span className="text-orange-600 text-xs" title="Verified">
                              ✓
                            </span>
                          )}
                          <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                        </div>
                        <p className="text-sm text-foreground mb-2 leading-relaxed">{reply.text}</p>
                        <div className="flex items-center gap-3 text-xs">
                          <button className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" />
                            <span>{reply.likes}</span>
                          </button>
                          <button className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                            <ThumbsDown className="w-3 h-3" />
                            <span>{reply.dislikes}</span>
                          </button>
                          <button className="text-muted-foreground hover:text-foreground transition-colors">
                            Responder
                          </button>                          
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentsSection