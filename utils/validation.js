// Validación para números (para teléfono)
const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;  // Asegura que solo haya 10 números
    return phoneRegex.test(phone);
  };
  
  // Validación para nombres (solo letras y espacios)
  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;  // Acepta solo letras y espacios
    return nameRegex.test(name);
  };
  
  // Validación para direcciones (solo letras, números y espacios)
  const validateAddress = (address) => {
    const addressRegex = /^[a-zA-Z0-9\s,]+$/;  // Acepta letras, números, y comas
    return addressRegex.test(address);
  };
  
  module.exports = {
    validatePhoneNumber,
    validateName,
    validateAddress
  };
  