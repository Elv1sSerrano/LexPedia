import ArticleCard from "../../components/ArticleCard"
import SearchBar from "../../components/SearchBar"
import fotoArticulo from "../../assets/images/fotoArticulo.jpg"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"

const articles = [
  {id: "articulo269f", image: fotoArticulo, label: "Procesos", date: "Julio 20, 2025", title: "Artículo 269 F", shortDescription: "El que, sin estar facultado para ello, con provecho propio o de un tercero, obtenga, compile, sustraiga, ofrezca, venda, intercambie, envíe, compre, intercepte, divulgue, modifique o emplee códigos personales, datos personales contenidos en ficheros, archivos, bases de datos o medios semejantes, incurrirá en pena de prisión de cuarenta y ocho (48) a noventa y seis (96) meses y en multa de 100 a 1000 salarios mínimos legales mensuales vigentes."},
  {id: "articulo269f", image: fotoArticulo, label: "Procesos", date: "Julio 20, 2025", title: "Artículo 269 F", shortDescription: "El que, sin estar facultado para ello, con provecho propio o de un tercero, obtenga, compile, sustraiga, ofrezca, venda, intercambie, envíe, compre, intercepte, divulgue, modifique o emplee códigos personales, datos personales contenidos en ficheros, archivos, bases de datos o medios semejantes, incurrirá en pena de prisión de cuarenta y ocho (48) a noventa y seis (96) meses y en multa de 100 a 1000 salarios mínimos legales mensuales vigentes."},  
  {id: "articulo269f", image: fotoArticulo, label: "Procesos", date: "Julio 20, 2025", title: "Artículo 269 F", shortDescription: "El que, sin estar facultado para ello, con provecho propio o de un tercero, obtenga, compile, sustraiga, ofrezca, venda, intercambie, envíe, compre, intercepte, divulgue, modifique o emplee códigos personales, datos personales contenidos en ficheros, archivos, bases de datos o medios semejantes, incurrirá en pena de prisión de cuarenta y ocho (48) a noventa y seis (96) meses y en multa de 100 a 1000 salarios mínimos legales mensuales vigentes."},  
]

const Home = () => {
  return (
    <section className="p-4 flex flex-col gap-6">      
      <SearchBar />
      <h1 className="text-4xl font-bold">Últimos artículos publicados</h1>
      <section className="grid grid-cols-3 gap-4">
        {articles.map((article) => (          
            <Card key={article.id}>
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
                <img className="h-[250px] w-full object-cover rounded-2xl" src={article.image} alt={article.title} />
              </CardHeader>
              <CardContent>
                <CardDescription>{article.shortDescription}</CardDescription>
              </CardContent>
            </Card>                    
        ))}
      </section>
    </section>
  )
}

export default Home