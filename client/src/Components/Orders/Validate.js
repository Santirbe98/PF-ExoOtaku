export function Validate(input) {
  let errors;
  if (input < 0 || /[a-zA-Z ]/g.test(input)) {
    errors = "Debe ser un valor no negativo";
  }
  return errors;
}
