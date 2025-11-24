import { BallTriangle } from 'react-loader-spinner';

const Loader = () => {
  return (
    <BallTriangle
      height={500} // Altura en píxeles
      width={500}  // Ancho en píxeles
      radius={5}   // Radio del borde
      color="#1787e0" // Color principal del spinner
      ariaLabel="ball-triangle-loading" // Etiqueta para accesibilidad
      wrapperStyle={{
        display: 'flex',           // Habilita el modo flex
        justifyContent: 'center',  // Centrado horizontal
        alignItems: 'center',      // Centrado vertical                
      }}
      wrapperClass="" // Clase CSS para el contenedor (opcional)
      visible={true} // Controla la visibilidad
    />
  )
}

export default Loader