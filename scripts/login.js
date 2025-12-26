const API_URL = "https://snorlaxbrackets-default-rtdb.firebaseio.com/login.json";

async function login() {
  const userInput = document.getElementById("username").value;
  const passInput = document.getElementById("password").value;
  const message = document.getElementById("message");

  message.textContent = "Verificando...";
  message.className = "text-secondary";

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    let authenticated = false;

    for (let key in data) {
      if (
        data[key].user === userInput &&
        data[key].pass === passInput
      ) {
        authenticated = true;
        break;
      }
    }

    if (authenticated) {
      message.textContent = "Login correcto ✔";
      message.className = "text-success";

      setTimeout(() => {
        window.location.href = "template.html";
      }, 800);

    } else {
      message.textContent = "Usuario o contraseña incorrectos";
      message.className = "text-danger";
    }

  } catch (error) {
    message.textContent = "Error al conectar con la API";
    message.className = "text-danger";
    console.error(error);
  }
}
