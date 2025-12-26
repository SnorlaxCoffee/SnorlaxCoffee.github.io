const API_URL = "https://snorlaxbrackets-default-rtdb.firebaseio.com/login.json";

async function register() {
  const user = document.getElementById("newUser").value;
  const pass = document.getElementById("newPass").value;
  const message = document.getElementById("message");

  if (!user || !pass) {
    message.textContent = "Completa todos los campos";
    message.className = "text-danger";
    return;
  }

  try {
    // Genera un ID automático
    const userId = "user_" + Date.now();

    const response = await fetch(
      `https://snorlaxbrackets-default-rtdb.firebaseio.com/login/${userId}.json`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: user,
          pass: pass
        })
      }
    );

    if (response.ok) {
      message.textContent = "Registro exitoso ✔";
      message.className = "text-success";

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    }

  } catch (error) {
    message.textContent = "Error al registrar";
    message.className = "text-danger";
    console.error(error);
  }
}
