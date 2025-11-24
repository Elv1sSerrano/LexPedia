import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "@/components/ui/Loader"
import { toast } from "react-toastify"


const EditArticle = ({close}) => {

  const navigate = useNavigate()

  const { articuloId } = useParams()  

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ articleData, setArticleData ] = useState({
      numeroArticulo: "",
      nombreDelDelito: "",
      codigoPenal: "",
      tituloCodigoPenal: "",
      leyDeInclusion: "",
      fechaVigencia: "",
      bienJuridicoTutelado: "",
      objetoMaterial: "",
      elementoSubjetivo: "",
      shortDescription: "",
      penaPrisionMinima: "",
      penaPrisionMaxima: "",
      multaMinima: "",
      multaMaxima: "",
      circunstanciasAgravacion: "",
      estadoPublicacion: "PUBLICADO",
      label: "",
      image: "",
  })

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/articulos/${articuloId}`)
        setArticleData(response.data)        
      } catch (err) {
        console.error(err)
      }
    } 

    fetchData()

  }, [])

    const handleSubmit = async (e) => {
      e.preventDefault()
      setIsSubmitting(true)

      const dto = {
        ...articleData
      }      

      try {
        axios.put(`http://localhost:8080/api/articulos/${articuloId}`, dto)
        toast.success("Artículo actualizado con éxito")        
      } catch (err) {
        toast.error("No se ha podido editar el artículo")
        console.error(err)
      } finally {
        setIsSubmitting(false)
      }

    }

    const handleInputChange = (e) => {
      const { name, value } = e.target
      setArticleData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  
    const handleSelectChange = (name, value) => {
      setArticleData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }    

    if(isSubmitting) return <Loader />

  return (
    <section className="fixed inset-2 bg-black z-50 ">
      <div className="max-w-4xl mx-auto space-y-6 p-8 rounded-xl shadow-2xl overflow-y-auto max-h-[90vh]"
    onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">Editar Artículo</h1>
            <Edit />
          </div>
          <p className="text-lg text-muted-foreground">
            Completa todos los campos para editar el artículo.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
              <CardDescription>Datos fundamentales del artículo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="numeroArticulo">Número del Artículo *</Label>
                  <Input
                    id="numeroArticulo"
                    name="numeroArticulo"
                    placeholder="e.g., 269 F"
                    value={articleData.numeroArticulo}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nombreDelDelito">Nombre del Delito *</Label>
                  <Input
                    id="nombreDelDelito"
                    name="nombreDelDelito"
                    placeholder="e.g., Violación de Datos Personales"
                    value={articleData.nombreDelDelito}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDescription">Descripción *</Label>
                <Textarea
                  id="shortDescription"
                  name="shortDescription"
                  placeholder="Descripción breve del delito"
                  rows={4}
                  value={articleData.shortDescription}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2 w-full">
                <Label htmlFor="shortDescription">Imagen *</Label>
                <Input
                  id="image"
                  name="image"
                  placeholder="URL de la imagen"                  
                  value={articleData.image}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="label">Etiqueta/Categoría</Label>
                  <Input
                    id="label"
                    name="label"
                    placeholder="e.g., Procesos"
                    value={articleData.label}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estadoPublicacion">Estado de Publicación *</Label>
                  <Select
                    value={articleData.estadoPublicacion}
                    onValueChange={(value) => handleSelectChange("estadoPublicacion", value)}                    
                  >
                    <SelectTrigger id="estadoPublicacion">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PUBLICADO">Publicado</SelectItem>
                      <SelectItem value="BORRADOR">Borrador</SelectItem>
                      <SelectItem value="ARCHIVADO">Archivado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legal Framework */}
          <Card>
            <CardHeader>
              <CardTitle>Marco Legal</CardTitle>
              <CardDescription>Códigos y leyes aplicables</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="codigoPenal">Código Penal *</Label>
                  <Input
                    id="codigoPenal"
                    name="codigoPenal"
                    placeholder="e.g., Ley 599 de 2000"
                    value={articleData.codigoPenal}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leyDeInclusion">Ley de Inclusión *</Label>
                  <Input
                    id="leyDeInclusion"
                    name="leyDeInclusion"
                    placeholder="e.g., Ley 1273 de 2009"
                    value={articleData.leyDeInclusion}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tituloCodigoPenal">Título del Código Penal *</Label>
                <Textarea
                  id="tituloCodigoPenal"
                  name="tituloCodigoPenal"
                  placeholder="e.g., Título VII Bis - De los atentados contra la confidencialidad..."
                  rows={3}
                  value={articleData.tituloCodigoPenal}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fechaVigencia">Fecha de Vigencia *</Label>
                <Input
                  id="fechaVigencia"
                  name="fechaVigencia"
                  type="date"
                  value={articleData.fechaVigencia}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Protected Legal Interests */}
          <Card>
            <CardHeader>
              <CardTitle>Intereses Jurídicos Protegidos</CardTitle>
              <CardDescription>Protecciones legales y objeto material</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bienJuridicoTutelado">Bien Jurídico Tutelado *</Label>
                <Input
                  id="bienJuridicoTutelado"
                  name="bienJuridicoTutelado"
                  placeholder="e.g., Protección de la información y de los datos"
                  value={articleData.bienJuridicoTutelado}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="objetoMaterial">Objeto Material *</Label>
                <Textarea
                  id="objetoMaterial"
                  name="objetoMaterial"
                  placeholder="Descripción del objeto material del delito"
                  rows={3}
                  value={articleData.objetoMaterial}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="elementoSubjetivo">Elemento Subjetivo *</Label>
                <Textarea
                  id="elementoSubjetivo"
                  name="elementoSubjetivo"
                  placeholder="e.g., Con provecho propio o de un tercero"
                  rows={3}
                  value={articleData.elementoSubjetivo}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Penalties */}
          <Card className="bg-red-950/20 border-red-900/50">
            <CardHeader>
              <CardTitle className="text-red-400">Penas y Castigos</CardTitle>
              <CardDescription className="text-red-300">Rangos de prisión y multas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="penaPrisionMinima">Pena Prisión Mínima (meses) *</Label>
                  <Input
                    id="penaPrisionMinima"
                    name="penaPrisionMinima"
                    type="number"
                    placeholder="e.g., 48"
                    value={articleData.penaPrisionMinima}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="penaPrisionMaxima">Pena Prisión Máxima (meses) *</Label>
                  <Input
                    id="penaPrisionMaxima"
                    name="penaPrisionMaxima"
                    type="number"
                    placeholder="e.g., 96"
                    value={articleData.penaPrisionMaxima}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="multaMinima">Multa Mínima (SMMLV) *</Label>
                  <Input
                    id="multaMinima"
                    name="multaMinima"
                    type="number"
                    placeholder="e.g., 100"
                    value={articleData.multaMinima}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="multaMaxima">Multa Máxima (SMMLV) *</Label>
                  <Input
                    id="multaMaxima"
                    name="multaMaxima"
                    type="number"
                    placeholder="e.g., 1000"
                    value={articleData.multaMaxima}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Información Adicional</CardTitle>
              <CardDescription>Circunstancias y detalles adicionales</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="circunstanciasAgravacion">Circunstancias de Agravación</Label>
                <Textarea
                  id="circunstanciasAgravacion"
                  name="circunstanciasAgravacion"
                  placeholder="Detalles sobre circunstancias agravantes"
                  rows={4}
                  value={articleData.circunstanciasAgravacion}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex gap-4 justify-between pt-6">
              <Button className={"cursor-pointer"} type="button" variant="outline" onClick={close}>
                Cancelar
              </Button>
            <Button onClick={() => {setTimeout(navigate("/"), 10000)}} type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90 cursor-pointer">              
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default EditArticle