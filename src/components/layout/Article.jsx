import { useParams } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, FileText, Scale, Calendar, Bookmark } from "lucide-react"
import CommentsSection from "@/components/layout/CommentsSections"
import { useRoleContext } from "@/context/roles/roleContext"
import EditArticle from "@/pages/moderator/sections/EditArticle"
import { useEffect, useState } from "react"
import DeleteModal from "@/pages/moderator/components/DeleteModal"
import axios from "axios"
import Loader from "../ui/Loader"

const Article = () => {    

  const role = useRoleContext()
  const validRoles = role === "MODERATOR" 
  ? true 
  : role === "ADMIN"
  ? true
  : false  

  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)

  const handleEdit = () => {
    if(validRoles) setIsOpenEdit(true)
  }

  const closeEdit = () => {
    setIsOpenEdit(false)
  }

  const handleDelete = () => {
    if(validRoles) setIsOpenDelete(true)
  }    

  const cancel = () => {
    setIsOpenDelete(false)
  }  

  const { articuloId } = useParams()

  const [ articleData, setArticleData ] = useState(null)

  useEffect(() => {

    const fetchData = async () => {
      console.log(articuloId)
      const response = await axios.get(`http://localhost:8080/api/articulos/${articuloId}`)
      setArticleData(response.data)
    }

    fetchData()
  }, [])

  if (!articleData) return <Loader />

  return (    
    <main className="min-h-screen bg-linear-to-br from-slate-950 to-slate-900 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-4">
          {
            validRoles && 
            <div className="flex justify-between">
              <button onClick={ handleEdit } className="px-2 py-1 bg-amber-400 cursor-pointer rounded-xl">Editar</button>
              <button onClick={ handleDelete } className="px-2 py-1 bg-red-400 cursor-pointer rounded-xl">Eliminar</button>
            </div>
          }          
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Scale className="w-4 h-4" />
                <span>{articleData.codigoPenal}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                Artículo {articleData.numeroArticulo}
              </h1>
              <h2 className="text-2xl font-semibold text-primary">{articleData.nombreDelDelito}</h2>
            </div>
            <div className="flex flex-row gap-3">
              <Badge className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap">
                {articleData.estadoPublicacion}
              </Badge>
              <Bookmark className="w-6 h-6 text-yellow-300" />
            </div>
          </div>

          <div>
            <img src={articleData.image} alt="Imagen de los delitos que agrupa" className="h-[450px] w-full rounded-2xl object-cover" />
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Vigencia: {articleData.fechaVigencia}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <FileText className="w-4 h-4" />
              <span>Publicado: {new Date(articleData.fechaPublicacion).toLocaleDateString("es-CO")}</span>
            </div>
          </div>
        </div>

        {/* Main Description */}
        <Card className="border-2 border-primary/20 bg-slate-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertCircle className="w-5 h-5 text-primary" />
              Descripción del Delito
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed text-foreground/90">{articleData.shortDescription}</p>
          </CardContent>
        </Card>

        {/* Legal Framework */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Marco Legal</CardTitle>
              <CardDescription>Códigos Penales Aplicables</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold text-sm text-foreground">{articleData.codigoPenal}</p>
                <p className="text-sm text-muted-foreground mt-1">{articleData.tituloCodigoPenal}</p>
              </div>
              <div className="pt-3 border-t">
                <p className="font-semibold text-sm text-foreground mb-1">Ley de Inclusión:</p>
                <p className="text-sm text-muted-foreground">{articleData.leyDeInclusion}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Bien Jurídico Tutelado</CardTitle>
              <CardDescription>Protección Legal</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium text-primary mb-2">{articleData.bienJuridicoTutelado}</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{articleData.objetoMaterial}</p>
            </CardContent>
          </Card>
        </div>

        {/* Penalties Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-red-950/20 border-red-900/50">
            <CardHeader>
              <CardTitle className="text-base text-red-400">Pena de Prisión</CardTitle>
              <CardDescription className="text-red-300">Rango de Castigo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-slate-900 p-4 rounded-lg">
                  <p className="text-xs font-semibold uppercase tracking-wide text-red-400 mb-1">
                    Mínimo
                  </p>
                  <p className="text-3xl font-bold text-red-300">{articleData.penaPrisionMinima}</p>
                  <p className="text-xs text-muted-foreground mt-1">Meses</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                  <p className="text-xs font-semibold uppercase tracking-wide text-red-400 mb-1">
                    Máximo
                  </p>
                  <p className="text-3xl font-bold text-red-300">{articleData.penaPrisionMaxima}</p>
                  <p className="text-xs text-muted-foreground mt-1">Meses</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-950/20 border-amber-200 dark:border-amber-900/50">
            <CardHeader>
              <CardTitle className="text-base text-amber-400">Multa</CardTitle>
              <CardDescription className="text-amber-300">
                En Salarios Mínimos Legales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-slate-900 p-4 rounded-lg">
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber-400 mb-1">
                    Mínimo
                  </p>
                  <p className="text-3xl font-bold text-amber-300">{articleData.multaMinima}</p>
                  <p className="text-xs text-muted-foreground mt-1">SMMLV</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber-400 mb-1">
                    Máximo
                  </p>
                  <p className="text-3xl font-bold text-amber-300">{articleData.multaMaxima}</p>
                  <p className="text-xs text-muted-foreground mt-1">SMMLV</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className={""}>
              <CardTitle className="text-base">Elemento Subjetivo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-foreground/90">{articleData.elementoSubjetivo}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Circunstancias de Agravación</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-foreground/90">{articleData.circunstanciasAgravacion}</p>
            </CardContent>
          </Card>
        </div>
        </div>

        {/* Comments */}
        <CommentsSection comments={articleData.comments}/>

        {isOpenEdit && <EditArticle close={closeEdit} />}
        {isOpenDelete && <DeleteModal cancel={cancel} />}
      </main>
  )
}

export default Article