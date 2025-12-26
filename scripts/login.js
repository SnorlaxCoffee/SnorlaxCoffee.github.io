// ================= CONFIG =================
const API_BASE = "https://snorlaxbrackets-default-rtdb.firebaseio.com";
const LOGIN_ENDPOINT = `${API_BASE}/login`;

// ================= LOGIN =================
async function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  message.textContent = "";
  message.className = "";

  if (!user || !pass) {
    message.textContent = "Completa todos los campos";
    message.className = "text-danger";
    return;
  }

  try {
    message.textContent = "Verificando credenciales...";
    message.className = "text-secondary";

    const res = await fetch(`${LOGIN_ENDPOINT}.json`);
    const data = await res.json();

    let authenticated = false;

    if (data) {
      for (const key in data) {
        if (data[key].user === user && data[key].pass === pass) {
          authenticated = true;
          break;
        }
      }
    }

    if (authenticated) {
      message.textContent = "Acceso concedido ✔";
      message.className = "text-success";

      setTimeout(() => {
        window.location.href = "template.html";
      }, 700);
    } else {
      message.textContent = "Usuario o contraseña incorrectos";
      message.className = "text-danger";
    }

  } catch (err) {
    console.error(err);
    message.textContent = "Error al conectar con el servidor";
    message.className = "text-danger";
  }
}

// ================= REGISTER (MODAL) =================
async function register() {
  const user = document.getElementById("regUser").value.trim();
  const pass = document.getElementById("regPass").value.trim();
  const msg = document.getElementById("regMessage");

  msg.textContent = "";
  msg.className = "";

  if (!user || !pass) {
    msg.textContent = "Completa todos los campos";
    msg.className = "text-danger";
    return;
  }

  try {
    msg.textContent = "Creando cuenta...";
    msg.className = "text-secondary";

    // ID simple (Spark friendly)
    const userId = "user_" + Date.now();

    await fetch(`${LOGIN_ENDPOINT}/${userId}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, pass })
    });

    msg.textContent = "Cuenta creada ✔";
    msg.className = "text-success";

    setTimeout(() => {
      const modalEl = document.getElementById("registerModal");
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal.hide();

      // limpiar campos
      document.getElementById("regUser").value = "";
      document.getElementById("regPass").value = "";
      msg.textContent = "";
    }, 1000);

  } catch (err) {
    console.error(err);
    msg.textContent = "Error al registrar";
    msg.className = "text-danger";
  }
}
