export const validate = (input) => {
  let errors = {};
  if (!input.name || input.name.length === 0) {
    errors.name = "Debe ingresar Nombre";
  } else if (
    input.name.length > 0 &&
    (/[0-9]/.test(input.name) || !/[a-zA-Z ]/.test(input.name))
  ) {
    errors.name = "Debe contener solo letras.";
  }

  if (!input.descriptions || input.descriptions.length === 0) {
    errors.descriptions = "Debe ingresar Descripcion";
  }

  if (input.price < 0 || input.price === 0) {
    errors.price = "Debe ser mayor a 0.";
  }

  if (input.stock <= 0) {
    errors.stock = "Debe ser mayor a 0.";
  }

  if (!input.category || input.category.length === 0) {
    errors.category = "Debe ingresar Categoria.";
  }

  if (input.images.length === 0) {
    errors.images = "Debe ingresar una Imagen";
  }

  if (input.type.length === 0) {
    errors.type = "Debe ingresar Tipo";
  }

  if (input.color.length === 0) {
    errors.color = "Debe ingresar Color";
  }

  return errors;
};
