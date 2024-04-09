function desocuparEspacioPorTexto() {
    var input = document.getElementById('espacioInput').value.toUpperCase(); // Asegura que el texto esté en mayúsculas para coincidir con los IDs
    var espacios = document.getElementsByClassName('espacio');

    for (var i = 0; i < espacios.length; i++) {
        if (espacios[i].textContent.trim() === input) {
            // Obtén el color de fondo actual del elemento
            let colorDeFondo = window.getComputedStyle(espacios[i], null).getPropertyValue('background-color');
            
            // Comprobar si el color es rojo
            if (colorDeFondo === 'red' || colorDeFondo === 'rgb(255, 0, 0)') {
                espacios[i].style.backgroundColor = 'green'; // Cambiar a verde
                alert('Espacio desocupado');
                break; // Salir del bucle después de encontrar y cambiar el espacio
            } else {
                alert('El espacio ya está desocupado.');
                break; // Salir del bucle si el espacio ya está desocupado
            }
        }
    }
}


document.getElementById('desocuparEspacio').addEventListener('click', function() {
    var inputTexto = document.getElementById('inputEspacio').value.toUpperCase(); // Consigue el valor ingresado y conviértelo a mayúsculas
    let encontrado = false; // Flag para verificar si se encontró el espacio

    // Itera sobre cada elemento con la clase 'espacio'
    document.querySelectorAll('.espacio').forEach(function(espacio) {
        if (espacio.textContent.trim() === inputTexto && espacio.style.backgroundColor === 'red') {
            espacio.style.backgroundColor = 'green'; // Cambia el color a verde si es rojo
            
            // Realizar la solicitud de fetch para desocupar el espacio
            fetch('http://localhost:3000/EspacioLibre', {
                method: 'POST', // Utiliza el método POST para modificar un campo en la base de datos
                headers: {
                    'Content-Type': 'application/json' // Especifica el tipo de contenido como JSON
                },
                body: JSON.stringify({ // Envía los datos necesarios para identificar el espacio a desocupar
                    espacio: inputTexto // El espacio a desocupar
                })
            })
            .then(response => {
                if (response.ok) {
                    alert('Espacio desocupado');
                } else {
                    alert('Error al desocupar el espacio');
                }
            })
            .catch(error => {
                console.error('Error al desocupar el espacio:', error);
            });

            encontrado = true; // Marca que se encontró el espacio
        }
    });

    if (!encontrado) {
        alert('Espacio no encontrado o ya desocupado');
    }
});