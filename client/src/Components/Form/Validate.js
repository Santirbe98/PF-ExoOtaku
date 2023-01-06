export const validate = (input) => {
  let errors = {};
  if (input.imagesDb.length === 0) errors.imagen = "Debe ingresar una imagen ";

  if (input.color.length < input.imagesDb.length) {
    errors.color = "Debe ingresar un color";
  }
  if (!input.name || input.name.length === 0) {
    errors.name = "Debe ingresar Nombre";
  } else if (input.name.length > 30) {
    errors.name = "Debe contener menos de 30 caracteres.";
  }

  if (!input.descriptions || input.descriptions.length === 0) {
    errors.descriptions = "Debe ingresar Descripcion";
  } else if (input.descriptions.length > 140) {
    errors.descriptions = "Debe contener menos de 140 caracteres.";
  }

  if (input.price <= 0) {
    errors.price = "Debe ser mayor a 0.";
  }

  if (input.stock <= 0) {
    errors.stock = "Debe ser mayor a 0.";
  }

  if (!input.category || input.category.length === 0) {
    errors.category = "Debe ingresar Categoria.";
  } else if (input.category.length > 30) {
    errors.category = "Debe contener menos de 30 caracteres.";
  }

  if (input.type.length === 0) {
    errors.type = "Debe ingresar Tipo";
  }

  return errors;
};
