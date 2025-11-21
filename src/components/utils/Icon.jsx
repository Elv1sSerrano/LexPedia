const Icon = ( {width, height, color, paths} ) => {
  return (
    <svg  
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height}  
      fill={color} 
      viewBox="0 0 24 24" >  
      <path d={paths}></path>
    </svg>
  )
}

export default Icon