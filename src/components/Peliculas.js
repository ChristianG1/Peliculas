import React from 'react';

const Peliculas = ({pelicula, eliminarPelicula}) =>( 
    <div className="pelicula">
        <img src={pelicula.imagen} height="200px" width="200px" alt="No colocaste foto de la peli :)"></img>
        <p>Nombre: <span>{pelicula.nombre}</span></p>
        <p>Fecha de estreno: <span>{pelicula.fecha}</span></p>
        <p>Duración:<span> {pelicula.duracion} minutos</span></p>
        <p>Descripción:<span> {pelicula.descripcion}</span></p>

        <button
            className="button eliminar u-full-width"
            onClick={()=> eliminarPelicula(pelicula.id)}
        >Eliminar &times;</button>
    </div>
);
 
export default Peliculas;