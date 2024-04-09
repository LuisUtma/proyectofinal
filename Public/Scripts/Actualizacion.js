document.addEventListener('DOMContentLoaded', function() {
    // Función para realizar la operación de obtener el estado de los estacionamientos y actualizar la interfaz
    function solicitarYActualizarEstacionamientos() {
        obtenerEstadoEstacionamientos()
            .then(data => {
                // Si necesitas hacer algo con los datos después de actualizar los estilos, puedes hacerlo aquí.
            })
            .catch(error => {
                console.error('Error al obtener el estado de los estacionamientos:', error);
            });
    }

    // Llamar a la función inmediatamente para cargar los estados al inicio.
    solicitarYActualizarEstacionamientos();
    
    // Establecer el polling cada 10 segundos para actualizar los estados de los estacionamientos.
    setInterval(solicitarYActualizarEstacionamientos, 5000);
});


function obtenerEstadoEstacionamientos() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('/obtenerEstadoEstacionamientos');
            const data = await response.json();
          
            // Actualizar estilos de estacionamiento con los datos obtenidos
            actualizarEstilosEstacionamientos(data);

            // Iterar sobre los datos para propósitos de depuración o procesamiento adicional
         
            resolve(data);
        } catch (error) {
            console.error('Error al obtener el estado de los estacionamientos:', error);
            reject(error);
        }
    });
}

function actualizarEstilosEstacionamientos(data) {
    data.forEach(estacionamiento => {
        const divEspacio = document.querySelector(`.espacio[data-lugar="${estacionamiento.lugar}"]`);
        if (divEspacio) { // Asegurar que divEspacio no es null antes de intentar acceder a sus propiedades
            if (estacionamiento.disponibilidad === 0) {
                divEspacio.style.backgroundColor = 'red';
            } else {
                divEspacio.style.backgroundColor = 'green';
            }
        } else {
            console.warn(`No se encontró el div para ${estacionamiento.lugar}.`);
        }
    });
}
