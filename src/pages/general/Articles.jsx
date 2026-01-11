import ArticleCard from "@/components/ui/ArticleCard"
import Loader from "@/components/ui/Loader"
import SearchBar from "@/components/ui/SearchBar"
import axios from "axios"
import { useEffect, useState } from "react"

const Articles = () => {

  const [articlesData, setArticlesData] = useState(null)
  const [searchValue, setSearchValue] = useState("")
  const [filterStatus, setFilterStatus] = useState("TODOS")

  const filterOptions = ["TODOS", "NO_VIGENTE", "DEROGADO", "MODIFICADO"]

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8080/api/articulos")
      setArticlesData(response.data)
    }
    fetchData()
  }, [])

  if(!articlesData) return <Loader />

  const filteredArticles = articlesData.filter(article => {
    const matchesSearch =
      article.nombreDelDelito.toLowerCase().includes(searchValue.toLowerCase()) ||
      article.numeroArticulo.toString().includes(searchValue) ||
      article.codigoPenal.toLowerCase().includes(searchValue.toLowerCase())

    const matchesFilter =
      filterStatus === "TODOS" ||
      article.estadoPublicacion === filterStatus

    return matchesSearch && matchesFilter
  })

  return (
    <section className="p-4 flex flex-col gap-6">      

      <SearchBar 
        searchValue={searchValue} 
        setSearchValue={setSearchValue} 
      />

      {/* Filtros */}
      <div className="flex gap-3 flex-wrap justify-center">
        {filterOptions.map(option => (
          <button
            key={option}
            onClick={() => setFilterStatus(option)}
            className={`px-4 py-2 rounded-md border 
              ${filterStatus === option 
                ? "bg-blue-600 text-white border-blue-600" 
                : "bg-transparent text-blue-600 border-blue-600 hover:bg-blue-50"
              }`}
          >
            {option.replace("_", " ")}
          </button>
        ))}
      </div>

      <h1 className="text-4xl font-bold">Últimos artículos publicados</h1>

      <section className="grid grid-cols-3 gap-4">
        {filteredArticles.map(article => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </section>
    </section>
  )
}

export default Articles
