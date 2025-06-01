export function enableValidation(config) {
  const { formSelector, ...other } = config;
  const formsList = Array.from(document.querySelectorAll(formSelector));
  formsList.forEach(form => enableFormValidation(form, other));
}

export function clearValidation(formElement, config) {
  const { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass } = config;
  const inputs = Array.from(formElement.querySelectorAll(inputSelector));
  inputs.forEach(inputElement => hideInputError(formElement, inputElement, inputErrorClass, errorClass));

  const buttonElement = formElement.querySelector(submitButtonSelector);
  disableButton(buttonElement, inactiveButtonClass);
}

export function showInputError(formElement, inputElement, inputErrorClass, errorClass) {
  inputElement.classList.add(inputErrorClass);

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
  inputElement.classList.remove(inputErrorClass);

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

function enableFormValidation(formElement, config) {
  const { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass } = config;
  const inputs = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  checkButtonAvailability(inputs, buttonElement, inactiveButtonClass);

  inputs.forEach(inputElement =>
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      checkButtonAvailability(inputs, buttonElement, inactiveButtonClass);
    }),
  );
}

function checkButtonAvailability(inputs, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputs)) {
    disableButton(buttonElement, inactiveButtonClass);
  } else {
    enableButton(buttonElement, inactiveButtonClass);
  }
}

function hasInvalidInput(inputs) {
  return inputs.some(inputElement => !inputElement.validity.valid);
}

function disableButton(buttonElement, inactiveButtonClass) {
  buttonElement.disabled = true;
  buttonElement.classList.add(inactiveButtonClass);
}

function enableButton(buttonElement, inactiveButtonClass) {
  buttonElement.disabled = false;
  buttonElement.classList.remove(inactiveButtonClass);
}

function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    return showInputError(formElement, inputElement, inputErrorClass, errorClass);
  }

  hideInputError(formElement, inputElement, inputErrorClass, errorClass);
}
