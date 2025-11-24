import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { truncateText } from "../utils/truncateText"

const ArticleCard = ({id, image, title, nombreDelDelito, numeroArticulo, shortDescription}) => {

  const displayDescription = truncateText(shortDescription, 140)

  return (
    <Link to={`articulo/${id}`}>
      <Card key={id}>
        <CardHeader>
          <CardTitle className={"text-2xl"}>{numeroArticulo}</CardTitle>          
          <CardDescription>{nombreDelDelito}</CardDescription>
        </CardHeader>
        <CardContent>          
          <img className="h-[250px] w-full object-cover rounded-2xl" src={image} alt={title} />
          <CardDescription className={"mt-2"}>{displayDescription}</CardDescription>
        </CardContent>
      </Card> 
    </Link>
  )
}

export default ArticleCard