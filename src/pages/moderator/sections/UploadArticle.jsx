import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, ArrowRight } from "lucide-react"
import { toast } from "react-toastify"
import axios from "axios"
import Loader from "@/components/ui/Loader"
import { useUserIdContext } from "@/context/roles/roleContext"

  const UploadArticle = () => {

    const userId = useUserIdContext()
    
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
    
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
  
    const handleInputChange = (e) => {
      const { name, value } = e.target
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  
    const handleSelectChange = (name, value) => {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }    
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      setIsSubmitting(true)      
      
      const dto = {
        numeroArticulo: formData.numeroArticulo,
        nombreDelDelito: formData.nombreDelDelito,
        image: formData.image,                   // ✔️ ahora coincide
        label: formData.label,
        shortDescription: formData.shortDescription,
        codigoPenal: formData.codigoPenal,
        tituloCodigoPenal: formData.tituloCodigoPenal,
        leyDeInclusion: formData.leyDeInclusion,
        fechaVigencia: formData.fechaVigencia,   // YYYY-MM-DD (OK para LocalDate)
        bienJuridicoTutelado: formData.bienJuridicoTutelado,
        objetoMaterial: formData.objetoMaterial,
        elementoSubjetivo: formData.elementoSubjetivo,
        penaPrisionMinima: Number(formData.penaPrisionMinima),
        penaPrisionMaxima: Number(formData.penaPrisionMaxima),
        multaMinima: Number(formData.multaMinima),
        multaMaxima: Number(formData.multaMaxima),
        circunstanciasAgravacion: formData.circunstanciasAgravacion,
        estadoPublicacion: formData.estadoPublicacion,
        fechaPublicacion: new Date().toISOString(),   // ✔️ formato LocalDateTime
        autorId: userId                                // ✔️ corregido camelCase
      };


      try {
        // Simulate API call
        await axios.post("http://localhost:8080/api/articulos", dto)
      
        // Reset form
        setFormData({
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
        })
        toast.success("Artículo subido correctamente")
      } catch (error) {
        console.error("Error uploading article:", error)
        toast.error("Error al subir el artículo")
      } finally {
        setIsSubmitting(false)
      }
    }  

    if(isSubmitting) return <Loader />

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 to-slate-900 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">Cargar Artículo Legal</h1>
            <Upload className="w-6 h-6 text-primary" />
          </div>
          <p className="text-lg text-muted-foreground">
            Completa todos los campos para crear un nuevo artículo legal en la base de datos.
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
                    value={formData.numeroArticulo}
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
                    value={formData.nombreDelDelito}
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
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDescription">Imagen *</Label>
                <Input
                  id="image"
                  name="image"
                  placeholder="URL de la imagen"                  
                  value={formData.image}
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
                    value={formData.label}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estadoPublicacion">Estado de Publicación *</Label>
                  <Select
                    value={formData.estadoPublicacion}
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
                    value={formData.codigoPenal}
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
                    value={formData.leyDeInclusion}
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
                  value={formData.tituloCodigoPenal}
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
                  value={formData.fechaVigencia}
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
                  value={formData.bienJuridicoTutelado}
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
                  value={formData.objetoMaterial}
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
                  value={formData.elementoSubjetivo}
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
                    value={formData.penaPrisionMinima}
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
                    value={formData.penaPrisionMaxima}
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
                    value={formData.multaMinima}
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
                    value={formData.multaMaxima}
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
                  value={formData.circunstanciasAgravacion}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex gap-4 justify-between pt-6">
              <Button type="button" variant="outline" className={"cursor-pointer"}>
                Cancelar
              </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90 cursor-pointer">
              {isSubmitting ? "Cargando..." : "Cargar Artículo"}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default UploadArticle