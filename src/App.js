import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario'
import Peliculas from './components/Peliculas';


function App() {

  // * Citas en localstorage
  let peliculasIniciales = JSON.parse(localStorage.getItem("peliculas"))
  if(!peliculasIniciales){
    peliculasIniciales = [];
  }
  //State de citas
  const [peliculas, guardarPelicula] = useState(peliculasIniciales);

  //Función para tomar una cita actual y añadir una nueva
  const crearPelicula = pelicula => {
    guardarPelicula([
      ...peliculas, 
      pelicula
    ]);
  } 

  // * UseEffect
  useEffect(()=>{
    let peliculasIniciales = JSON.parse(localStorage.getItem('peliculas'));
    if(peliculasIniciales){
      localStorage.setItem('peliculas', JSON.stringify(peliculas))
    } else{ 
      localStorage.setItem('peliculas', JSON.stringify([]))
    }
  }, [peliculas])

  // * Función para eliminar una pelicula mediante su ID
  const eliminarPelicula = id => {
    const nuevaPelicula = peliculas.filter(pelicula => pelicula.id !== id);
    guardarPelicula(nuevaPelicula);
  }

  // * Mensaje condicional 
  const mensaje = peliculas.length === 0 ? 'No hay peliculas registradas':'Tus peliculas';

  return (
    <Fragment>
      <h1>PeliTimes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
              <Formulario
                crearPelicula = {crearPelicula}
              />
          </div>

          <div className="one-half column">
              <h2>{mensaje}</h2>
              {peliculas.map(pelicula => 
              <Peliculas 
                key={pelicula.id}
                pelicula = {pelicula}
                eliminarPelicula = {eliminarPelicula}
              />
              )}
              
          </div>
        </div>
      </div>

    </Fragment>
    
  );
}

export default App;
