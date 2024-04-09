document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const username = formData.get('username');
    const password = formData.get('password');

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    .then(response => {
      if (response.ok) {
        window.location.href = '/Admin.html';
        return response.text();
      } else {
        throw new Error('Nombre de usuario o contraseña incorrectos');
      }
    })
    .then(data => {
      alert(data); // Muestra el mensaje de inicio de sesión exitoso
    })
    .catch(error => {
      alert(error.message); // Muestra el mensaje de error
    });
  });