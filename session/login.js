document.getElementById("login").addEventListener("submit", function(e){

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const mensaje = document.getElementById("mensaje");

    // obtener usuarios
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // buscar usuario
    const usuarioEncontrado = usuarios.find(user =>
        user.email === email &&
        user.password === password
    );

    if(usuarioEncontrado){

        mensaje.textContent = "Inicio de sesión exitoso 🎉";
        mensaje.style.color = "green";

        // guardar sesión
        localStorage.setItem("sesionActiva", usuarioEncontrado.nombre);

        // redirigir al index principal
        setTimeout(() => {

            window.location.href = "../index.html";

        }, 1000);

    }else{

        mensaje.textContent = "Correo o contraseña incorrectos";
        mensaje.style.color = "red";
    }

});