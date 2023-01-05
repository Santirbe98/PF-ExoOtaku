export const validate = (input) => {
  let errors = {};
  if (input.imagesDb.length === 0) errors.imagen = "Debe ingresar una imagen ";

  if (input.color.length < input.imagesDb.length) {
    errors.color = "Debe ingresar un color";
  }
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
  } else {
    if (!/^[A-Za-z0-9\s]+$/g.test(input.category))
      errors.category = "No puede contener simbolos.";
  }

  if (input.type.length === 0) {
    errors.type = "Debe ingresar Tipo";
  }

  return errors;
};
