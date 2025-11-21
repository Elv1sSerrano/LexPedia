import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const ArticleCard = ({id, image, label, date, title, shortDescription}) => {
  return (
    <Link to={`articulo/${id}`}>
      <Card key={id}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <img className="h-[250px] w-full object-cover rounded-2xl" src={image} alt={title} />
        </CardHeader>
        <CardContent>
          <CardDescription>{shortDescription}</CardDescription>
        </CardContent>
      </Card> 
    </Link>
  )
}

export default ArticleCard