import React, { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    // Crear State de Citas
    const [cita, actualizarCita] = useState({
        paciente: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    const [ error, actualizarError ] = useState(false);

    // Funcion que se ejecuta cada que el usuario escribe un input
    const actualizarState = (e) => {

        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        });

    }

    // Extraer los valores, y ponerlos en <input... value={valor} /> para poderlo resetear
    const { paciente, fecha, hora, sintomas } = cita;

    // Cuando el usuario presiona agregar cita
    const submitCita = (e) => {

        e.preventDefault(); // con esto evitamos el comportamiento por defecto del submit: poner los parametros en la url

        // Validar
        if(paciente.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '' ) {

            actualizarError(true);

            return; // Para que no continue ejecutandose el codigo hacia abajo

        }

        // Eliminar el mensaje de error si todo esta correcto
        actualizarError(false);

        // Asignar un ID (para mostrar registros repetidos y que tenga un parametro que los diferencie)
        cita.id = uuidv4();

        // Crear la cita
        crearCita(cita);

        // Reiniciar el form, se reinicia gracias a <input... value={valor} />
        actualizarCita({
            paciente: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })

    }

    return (
        <Fragment>
            <h2>Crear Cita</h2>

            { error ? <p className="alerta-error"> Todos los campos son obligatorios </p> : null }

            {/* skeleton css Framework syntaxis in className */}
            <form
                onSubmit={submitCita}
            >

                <label>Nombre</label>
                <input 
                    type="text"
                    name="paciente"
                    className="u-full-width"
                    placeholder="Nombre Paciente"
                    onChange={actualizarState}
                    value={paciente}
                />

                <label>Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />

                <label>Hora</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />

                <label>Síntomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                    onChange={actualizarState}
                >Agregar Cita</button>

            </form>
        </Fragment>
    );
}


Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;