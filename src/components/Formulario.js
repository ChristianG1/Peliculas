import React, {Fragment, useState} from 'react';
import uuid from 'uuid/v4';

const Formulario = ({crearPelicula}) => {
    //Creación del state para las peliculas 
    const [pelicula, actualizarPelicula] = useState({
        nombre: '', 
        fecha: '',
        duracion: '', 
        imagen: '', 
        descripcion: ''
    });
    //State para validar
    const [error, actualizarError] = useState(false);
    
    //Funcion que se ejecuta cada vez que el usuario escriba en un input
    const actualizarState = e => { 
        actualizarPelicula({
            ...pelicula,
            [e.target.name]: e.target.value
        })
    }

    // * Función de la imagén 

    const actualizarImagen = e => {

        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => { 
            actualizarPelicula({
                ...pelicula,
                imagen: reader.result
            })

        }
        reader.readAsDataURL(file)

    } 

    //Extraer los valores
    const {nombre, fecha, duracion, imagen, descripcion} = pelicula;

    //Función para cuando el usuario presione el botón de enviar. :) 
    const submitPelicula = e => {
        e.preventDefault();
    
    //Validar 
    if(nombre.trim() === '' || fecha.trim() === '' || duracion.trim() === '' || descripcion.trim() === ''
    || imagen.trim() === ''){
        actualizarError(true);
        return;
    }
    //Eliminar el mensaje de validación. 
    actualizarError(false);

    //Asignar un ID
    pelicula.id = uuid();

    //Crear una pelicula 
    crearPelicula(pelicula);

   
    //Reiniciar el form 
    actualizarPelicula({
        nombre: '', 
        fecha: '',
        duracion: '', 
        imagen: '', 
        descripcion: ''
    })

    }

    return (  
        <Fragment>
            <h2>Añadir pelicula</h2>

            {error ? <p className="alerta-error">Todos los campos son obligatorios</p>:null}

            <form
                onSubmit={submitPelicula}
            >
                <label>Nombre de la pelicula</label>
                <input
                    type="text"
                    name="nombre"
                    className="u-full-width"
                    placeholder="Fight Club"
                    onChange={actualizarState}
                    value={nombre}
                />

                <label>Fecha de estreno</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />

                <label>Duración en minutos</label>
                <input
                    type="number"
                    name="duracion"
                    className="u-full-width"
                    placeholder="120"
                    onChange={actualizarState}
                    value={duracion}
                />

                <label>Imagen de la pelicula</label>
                <input
                    type="file"
                    accept="image/*"
                    name="imagen"
                    className="u-full-width"
                    onChange={(e)=>actualizarImagen(e)}
                />

                <label>Descripción de la pelicula</label>
                <textarea
                    className="u-full-width"
                    name="descripcion"
                    onChange={actualizarState}
                    value={descripcion}
                ></textarea>

                <button 
                type="submit" 
                className="u-full-width button-primary">Agregar pelicula</button>
            </form>
        </Fragment>

    );
}
 
export default Formulario;