export function validate(input) {
  let errors = {};
  if (!input.name || input.name.length === 0) {
    errors.name = "Name is required";
  } else if (
    input.name.length > 0 &&
    (/[0-9]/.test(input.name) || !/[a-zA-Z ]/.test(input.name))
  ) {
    errors.name = "A string is required";
  }

  if (!input.descriptions || input.descriptions.length === 0) {
    errors.descriptions = "Descriptions are required";
  }

  if (input.price < 0 || input.price === 0) {
    errors.price = "A non-negative number is required";
  }

  if (input.stock <= 0) {
    errors.stock = "A non-negative number is required";
  }

  if (!input.category || input.category.length === 0) {
    errors.category = "Category is required";
  }

  if (input.images.length === 0) {
    errors.images = "Image is required";
  }

  if (input.type.length === 0) {
    errors.type = "Type is Required";
  }

  if (input.color.length === 0) {
    errors.color = "Color is Required";
  }

  return errors;
}
