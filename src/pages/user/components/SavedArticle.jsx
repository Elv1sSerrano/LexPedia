import { Link } from "react-router-dom"

const SavedArticle = ({id, numeroArticulo, nombreDelDelito, image, title, shortDescription}) => {
  return (
    <Link to={`/user/articulo/${id}`}>    
      <div className="border-2 rounded-xl p-4 flex flex-row gap-3 bg-card">
        <img className="w-1/2 h-[150px] object-cover rounded-xl" alt={title} src={image} />
        <div className="flex flex-col justify-center gap-5">
          <h2 className="font-medium text-lg">{numeroArticulo} {nombreDelDelito}</h2>
          <p className="font-light text-sm">{shortDescription}</p>
        </div>
      </div>
    </Link>
  )
}

export default SavedArticle