const Modal = ({fields}) => {
  return (
    <div className="absolute top-12 right-2 w-[190px] p-4 bg-popover rounded-2xl">
      <ul className="flex flex-col gap-2">
        {fields.map((field) => (
          <li key={field.name}>
            <button className="cursor-pointer flex flex-row gap-3 items-center text-nowrap w-full hover:bg-accent p-2 rounded-md">
              {field.icon}
              <p>{field.name}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Modal