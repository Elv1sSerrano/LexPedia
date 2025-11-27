import { useSavedArticlesContext } from "@/context/roles/roleContext"
import SavedArticle from "../components/SavedArticle"

const Saved = () => {

  const savedArticles = useSavedArticlesContext()
  console.log(savedArticles)

  return (
    <section className="p-4">
      <h1 className="text-5xl font-bold text-foreground tracking-tight mb-7">Artículos guardados</h1>
      <section className="grid grid-cols-2 gap-4">
        {
          savedArticles.map((article) => (
            <SavedArticle key={article.id} {...article} />
          ))
        }
      </section>
    </section>
  )
}

export default Saved