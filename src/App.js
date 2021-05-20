import React, { Fragment, useState } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  // Array de citas
  const [ citas, guardarCitas ] = useState([]);

  // Funcion que tome las citas actuales y agregue la nueva
  const crearCita = cita => {
    // citas.push(cita) -> tambien funciona pero en React hay que usar las funciones que modifican el state para seguir las buenas practicas
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>

      {/* skeleton css Framework syntaxis from className */}
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>Administra tus citas</h2>
            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
