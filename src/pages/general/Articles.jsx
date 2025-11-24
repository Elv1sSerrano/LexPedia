import ArticleCard from "@/components/ui/ArticleCard"
import Loader from "@/components/ui/Loader"
import SearchBar from "@/components/ui/SearchBar"
import axios from "axios"
import { useEffect, useState } from "react"

const Articles = () => {

  const [ articlesData, setArticlesData ] = useState(null)

  useEffect(() => {

    const fetchData = async () => {
      const response = await axios.get("http://localhost:8080/api/articulos")
      setArticlesData(response.data)
    }

    fetchData()

  }, [])

  if(!articlesData) return <Loader />

  return (
    <section className="p-4 flex flex-col gap-6">      
      <SearchBar />
      <h1 className="text-4xl font-bold">Últimos artículos publicados</h1>
      <section className="grid grid-cols-3 gap-4">
        {articlesData.map((article) => (          
            <ArticleCard key={article.id} {...article} />
        ))}
      </section>
    </section>
  )
}

export default Articles