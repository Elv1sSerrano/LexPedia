import { Button } from "@/components/ui/button"

const DeleteModal = ({ deleteArticle, cancel }) => {

  return (
    <section className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center" >
      <div className="bg-accent w-xl rounded-xl border-2 border-red-500 flex flex-col gap-4 p-4">
        <h1 className="font-bold">Estás seguro de que deseas borrar el artículo?</h1>
        <div className="flex gap-4">
          <Button className={"cursor-pointer"} onClick={deleteArticle}>
            Sí
          </Button>
          <Button className={"cursor-pointer"} onClick={cancel}>
            No
          </Button>
        </div>
      </div>
    </section>
  )
}

export default DeleteModal