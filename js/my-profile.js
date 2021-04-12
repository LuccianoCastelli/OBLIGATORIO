const storageInput = document.querySelector(".storage");
const text = document.querySelector(".text");
const storedInput = localStorage.getItem("Nombre");

const edades = document.querySelector(".edades");
const number = document.querySelector(".Number");
const guardarInput = localStorage.getItem("Edad");

const emailformulario = document.querySelector(".emailformulario");
const emailresultado = document.querySelector(".emailresultado");
const guardaremail = localStorage.getItem("E-mail");

const telefonoformulario = document.querySelector(".telefonoformulario");
const telefonoresultado = document.querySelector(".telefonoresultado");
const guardartelefono = localStorage.getItem("Telefono");

const button = document.querySelector(".Button");

if (storageInput) {
  text.textContent = storedInput;
}

storageInput.addEventListener("input", (letter) => {
  text.textContent = letter.target.value;
});

const saveToLocalStorage = () => {
  localStorage.setItem("Nombre", text.textContent);
};

if (edades) {
  number.textContent = guardarInput;
}

edades.addEventListener("input", (letter) => {
  number.textContent = letter.target.value;
});

const saveToLocalStorage2 = () => {
  localStorage.setItem("Edad", number.textContent);
};

if (emailformulario) {
  emailresultado.textContent = guardaremail;
}

emailformulario.addEventListener("input", (letter) => {
  emailresultado.textContent = letter.target.value;
});

const saveToLocalStorage3 = () => {
  localStorage.setItem("E-mail", emailresultado.textContent);
};

if (telefonoformulario) {
  telefonoresultado.textContent = guardartelefono;
}

telefonoformulario.addEventListener("input", (letter) => {
  telefonoresultado.textContent = letter.target.value;
});

const saveToLocalStorage4 = () => {
  localStorage.setItem("Telefono", telefonoresultado.textContent);
};

button.addEventListener("click", saveToLocalStorage);
button.addEventListener("click", saveToLocalStorage2);
button.addEventListener("click", saveToLocalStorage3);
button.addEventListener("click", saveToLocalStorage4);

document.addEventListener("DOMContentLoaded", function (e) {});
