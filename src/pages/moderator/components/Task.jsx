import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Task = ({title, description, state, dateLimit, openModal}) => {
  return (
    <button className="cursor-pointer" onClick={openModal}>
      <Card className={"w-md text-left"}>
        <CardHeader>
          <Badge>
            {state}
          </Badge>
          <CardTitle>
            <h3 className="font-semibold text-xl">
              {title}
            </h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="opacity-90">
            {description}
          </p>
          <p className="text-red-300 mt-3">
            {dateLimit}
          </p>
        </CardContent>
      </Card>
    </button>
  )
}

export default Task