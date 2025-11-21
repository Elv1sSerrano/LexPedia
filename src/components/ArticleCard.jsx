import { Link } from "react-router-dom"

const ArticleCard = ({id, image, label, date, title, shortDescription}) => {
  return (
    <Link to={`/articulo/${id}`}>
      <article className="flex flex-col gap-2 bg-[#18181b] rounded-xl p-4">
        <img src={image} className="h-[300px] rounded-xl w-full object-cover" />
        <div className="flex flex-row justify-between items-center">
          <div className="px-2 py-1 bg-[#40a2f0] rounded-xl"><p>{label}</p></div>
          <p>{date}</p>
        </div>
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="opacity-85 text-lg">{shortDescription}</p>
      </article>
    </Link>
  )
}

export default ArticleCard