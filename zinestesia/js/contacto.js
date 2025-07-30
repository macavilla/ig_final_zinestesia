console.log("contacto :>> ");

const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const emailError = document.getElementById("email-error");
const submitBtn = document.getElementById("submit-btn");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

console.log("emailInput :>> ", emailInput);
const validationMessages = {
  empty: "Ingrese un mail.",
  invalid: "El mail ingresado no es válido, por favor reviselo.",
};

emailInput.addEventListener("input", () => {
  const emailValue = emailInput.value;

  if (emailValue === "") {
    emailError.style.display = "inline";
    emailError.innerHTML = validationMessages.empty;
    submitBtn.disabled = true;
    return;
  }
  if (emailRegex.test(emailValue)) {
    emailError.style.display = "none";
    submitBtn.disabled = false;
  } else {
    emailError.style.display = "inline";
    emailError.innerHTML = validationMessages.invalid;
    submitBtn.disabled = true;
  }
});
