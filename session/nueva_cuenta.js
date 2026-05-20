document.getElementById("registro").addEventListener("submit", function(e){

    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const direccion = document.getElementById("direccion").value;
    const password = document.getElementById("password").value;

    const mensaje = document.getElementById("mensaje");

    // validar campos
    if(nombre === "" || email === "" || direccion === "" || password === ""){

        mensaje.textContent = "Complete todos los campos";
        mensaje.style.color = "red";
        return;
    }

    // crear objeto usuario
    const usuario = {
        nombre,
        email,
        direccion,
        password
    };

    // obtener usuarios guardados
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // verificar correo repetido
    const existe = usuarios.some(user => user.email === email);

    if(existe){

        mensaje.textContent = "El correo ya está registrado";
        mensaje.style.color = "orange";
        return;
    }

    // guardar usuario
    usuarios.push(usuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mensaje.textContent = "Registro exitoso 🎉";
    mensaje.style.color = "green";

    // limpiar formulario
    document.getElementById("registro").reset();

});