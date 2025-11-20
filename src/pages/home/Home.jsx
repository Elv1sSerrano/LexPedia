import ArticleCard from "../../components/ArticleCard"
import SearchBar from "../../components/SearchBar"
import fotoArticulo from "../../assets/images/fotoArticulo.jpg"

const articles = [
  {image: fotoArticulo, label: "Procesos", date: "Julio 20, 2025", title: "Artículo 632", shortDescription: "Este artículo habla de los procesos que se llevan a cabo en determinados artículos además de otras cosas como"},
  {image: fotoArticulo, label: "Procesos", date: "Julio 20, 2025", title: "Artículo 632", shortDescription: "Este artículo habla de los procesos que se llevan a cabo en determinados artículos"},
]

const Home = () => {
  return (
    <main className="p-4 flex flex-col gap-6">      
      <SearchBar />
      <h1 className="text-4xl font-bold">Ultimos artículos publicados</h1>
      <section className="grid grid-cols-2 gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.title} {...article} />
        ))}
      </section>
    </main>
  )
}

export default Home