document.addEventListener("DOMContentLoaded", function() {
    const sessionModalEl = document.getElementById("sessionModal");
    const sessionModal = sessionModalEl ? new bootstrap.Modal(sessionModalEl) : null;
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const message = document.getElementById("sessionMessage");
    const greeting = document.getElementById("greeting");
    const greetingName = document.getElementById("greetingName");
    const logoutBtn = document.getElementById("logoutBtn");
    const openSessionBtn = document.getElementById("openSessionBtn");
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabPanes = document.querySelectorAll(".tab-pane");

    function showTab(targetId) {
        tabPanes.forEach(pane => {
            pane.classList.toggle("active", `#${pane.id}` === targetId);
        });
    }

    function setMessage(text, color) {
        if (!message) return;
        message.textContent = text;
        message.style.color = color || "";
    }

    function updateSessionUI() {
        const nombre = localStorage.getItem("sesionActiva");
        const isActive = Boolean(nombre);

        if (greeting && greetingName && logoutBtn && openSessionBtn) {
            greeting.classList.toggle("hidden", !isActive);
            logoutBtn.classList.toggle("hidden", !isActive);
            openSessionBtn.classList.toggle("hidden", isActive);
            if (isActive) {
                greetingName.textContent = nombre;
            }
        }
    }

    if (tabButtons.length) {
        tabButtons.forEach(button => {
            button.addEventListener("click", function() {
                tabButtons.forEach(b => b.classList.remove("active"));
                this.classList.add("active");
                showTab(this.dataset.target);
                setMessage("", "");
            });
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();

            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value.trim();
            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

            const usuarioEncontrado = usuarios.find(user => user.email === email && user.password === password);

            if (usuarioEncontrado) {
                localStorage.setItem("sesionActiva", usuarioEncontrado.nombre);
                updateSessionUI();
                setMessage("Inicio de sesión exitoso 🎉", "green");
                setTimeout(() => {
                    if (sessionModal) {
                        sessionModal.hide();
                    }
                }, 800);
            } else {
                setMessage("Correo o contraseña incorrectos", "red");
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", function(e) {
            e.preventDefault();

            const nombre = document.getElementById("registerName").value.trim();
            const email = document.getElementById("registerEmail").value.trim();
            const direccion = document.getElementById("registerAddress").value.trim();
            const password = document.getElementById("registerPassword").value.trim();

            if (!nombre || !email || !direccion || !password) {
                setMessage("Complete todos los campos", "red");
                return;
            }

            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            const existe = usuarios.some(user => user.email === email);

            if (existe) {
                setMessage("El correo ya está registrado", "orange");
                return;
            }

            usuarios.push({ nombre, email, direccion, password });
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            setMessage("Registro exitoso 🎉", "green");
            registerForm.reset();
            tabButtons.forEach(b => b.classList.remove("active"));
            document.querySelector(".tab-button[data-target='#loginPane']")?.classList.add("active");
            showTab("#loginPane");
        });
    }

    // Contact / Postulación handler
    const contactForm = document.getElementById("contactForm");
    const contactResult = document.getElementById("contactMessageResult");

    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();

            const name = document.getElementById("contactName").value.trim();
            const email = document.getElementById("contactEmail").value.trim();
            const role = document.getElementById("contactRole").value;
            const messageText = document.getElementById("contactMessage").value.trim();

            if (!name || !email || !role) {
                if (contactResult) {
                    contactResult.textContent = "Complete los campos requeridos";
                    contactResult.style.color = "red";
                }
                return;
            }

            const applications = JSON.parse(localStorage.getItem("applications")) || [];
            applications.push({ name, email, role, message: messageText, createdAt: new Date().toISOString() });
            localStorage.setItem("applications", JSON.stringify(applications));

            if (contactResult) {
                contactResult.textContent = "Solicitud enviada. Gracias por postularte 🎉";
                contactResult.style.color = "green";
            }

            contactForm.reset();

            // cerrar modal tras breve pausa
            setTimeout(() => {
                const modalEl = document.getElementById("contactModal");
                if (modalEl) new bootstrap.Modal(modalEl).hide();
            }, 900);
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function() {
            localStorage.removeItem("sesionActiva");
            updateSessionUI();
            setMessage("Sesión cerrada", "#333");
        });
    }

    updateSessionUI();
});
