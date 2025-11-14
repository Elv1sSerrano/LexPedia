const RegisterFormField = ({title, value, setter, placeholder}) => {
  return (
    <>
      <label className="text-2xl font-semibold">{title}</label>
      <input className="border-2 rounded-xl p-2 w-xs mb-3" 
        type="text" 
        placeholder={placeholder} 
        value={value} 
        onChange={(e) => setter(e.target.value)} />
    </>
  )
}

export default RegisterFormField