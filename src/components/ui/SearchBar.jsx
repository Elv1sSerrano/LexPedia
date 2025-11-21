import { useState } from "react"
import { searchPath } from "@/constants/iconPaths"
import Icon from "@/components/utils/Icon"

const SearchBar = () => {

  const [ searchValue, setSearchValue ] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleChange = (e) => {
    setSearchValue(e.target.value)
  }

  return (
    <article className="flex justify-center">
      <form onSubmit={handleSubmit} className="flex flex-row gap-2 items-center">
        <div className="flex flex-row gap-2 items-center bg-amber-50 text-black p-4 rounded-md w-[700px]">
          <Icon paths={searchPath} height={20} width={20} color={"#ccc"} />
          <input className="focus:outline-0 placeholder:text-[#ccc]" type="text" value={searchValue} onChange={handleChange} placeholder="Busca los artículos aquí ..." />
        </div>
        <button className="p-4 bg-[#0c4880] rounded-md cursor-pointer">Buscar</button>
      </form>
    </article>
  )
}

export default SearchBar