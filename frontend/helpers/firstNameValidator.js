// Validates first name is not empty during registration
export function firstNameValidator(firstName) {
  if (!firstName) return "First Name can't be empty."
  return ''
}
