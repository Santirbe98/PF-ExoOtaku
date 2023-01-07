export function validate(input) {
  let errors = {};

  if (!input.name) errors.name = "Please enter your Name";
  if (!input.email) errors.email = "Please enter your Name";
  if (!input.billing_address)
    errors.billing_address = "Please enter a Billing Addres";
  if (!input.shipping_address)
    errors.shipping_address = "Please enter a Shipping Addres";
  if (!input.country && input.country !== "None")
    errors.country = "Por favor seleccione un pais";
  if (!input.provincia && input.provincia !== "None")
    errors.provincia = "Por favor seleccione una provincia";
  if (!input.comuna && input.comuna !== "None")
    errors.comuna = "Por favor seleccione una comuna";
  if (!input.phone)
    errors.phone = "Por favor ingrese un numero de telefono de contacto";

  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(input.email))
    errors.email = "Por favor ingrese una direccion valida";
  if (!/^[a-zA-Z ]+$/.test(input.name))
    errors.name = "Por favor ingrese un nombre valido";
  if (!/^[A-Za-z0-9 ]+$/g.test(input.shipping_address))
    errors.shipping_address = "Por favor ingrese una direccion valida";
  if (!/^[A-Za-z0-9 ]+$/g.test(input.billing_address))
    errors.billing_address = "Por favor ingrese una direccion valida";
  if (!/[0-9]{1,10}/.test(input.phone))
    errors.phone =
      "Por favor ingrese un numero de telefono valido, ejemplo 549999999999";

  return errors;
}
