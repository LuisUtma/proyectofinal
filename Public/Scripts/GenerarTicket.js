document.getElementById('generarTicket').addEventListener('click', function() {
    let espacios = document.querySelectorAll('.espacio'); // Selecciona todos los espacios
    let espaciosDisponibles = Array.from(espacios).filter(function(espacio) {
        // Filtra solo los espacios que no tienen el color de fondo rojo (indicando que están disponibles)
        return espacio.style.backgroundColor !== 'red';
    });

    




        

    //Este codigo comunica tanto al cliente como el servidor para generar un cambio 
   if (espaciosDisponibles.length > 0) {
        const seleccionado = espaciosDisponibles[Math.floor(Math.random() * espaciosDisponibles.length)]; // Selecciona uno al azar de los disponibles
        document.getElementById('lugarEstacionamiento').textContent = seleccionado.textContent; // Establece el lugar dinámicamente
        fetch('http://localhost:3000/generarTicket', {
        method: 'POST', // Método HTTP POST para enviar datos
        headers: {
            'Content-Type': 'application/json' // Indica que los datos se enviarán en formato JSON
        },
        body: JSON.stringify({ // Cuerpo de la solicitud en formato JSON
            lugarEstacionamiento: seleccionado.textContent
        })
    })
    .then(response => response.json()) // Parsea la respuesta como JSON
    .then(data => {
        // Manejar la respuesta de la API aquí
        document.getElementById('lugarEstacionamiento').textContent = data.lugarEstacionamiento; // Establece el lugar dinámicamente
        
    })
    .catch(error => {
        console.error('Error al generar el ticket:', error);
    });
 
        seleccionado.style.backgroundColor = 'red'; // Cambia el color a rojo

        document.querySelector('.Ticket').style.display = 'none'; // Muestra el ticket
        
       

    
};


if(espaciosDisponibles.length > 0)
{
    
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: [80, 80] // Tamaño ajustado para impresora térmica
        });
    
        const pageWidth = doc.internal.pageSize.getWidth();
    
        // Función auxiliar para centrar texto
        function addCenteredText(text, y) {
            const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
            const textOffset = (pageWidth - textWidth) / 2;
            doc.text(text, textOffset, y);
        }
    
        let y = 10; // Inicia el cursor en esta posición Y para imprimir el texto
    
        doc.setFontSize(10); // Tamaño de fuente para el título
        addCenteredText('UTMAT', y);
        y += 5;
    
        doc.setFontSize(8); // Tamaño de fuente para el subtítulo y el resto del texto
        addCenteredText('Ticket de Estacionamiento', y);
        y += 10;
    
        const fecha = "6 de marzo de 2024";
        addCenteredText(`Fecha: ${fecha}`, y);
        y += 10;
    
        const lugarEstacionamiento = document.getElementById('lugarEstacionamiento').textContent;
        addCenteredText(`Lugar de Estacionamiento: ${lugarEstacionamiento}`, y);
        y += 10;
    
        const nombre = "Juan Pérez";
        addCenteredText(`Nombre: ${nombre}`, y);
        y += 10;
    
        addCenteredText('¡Gracias por usar nuestro servicio de estacionamiento!', y);
    
        // Guardar el documento PDF
        doc.save('ticket_estacionamiento.pdf');
    }else
    {
            console.error("No hay espacios disponibles")
    }
    });
   




