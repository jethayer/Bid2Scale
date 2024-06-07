// Validates last name is not empty during registration
export function lastNameValidator(lastName) {
  if (!lastName) return "Last Name can't be empty."
  return ''
}
