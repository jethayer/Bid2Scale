// Validates business # is not empty during registration
export function businessNumberValidator(businessNumber) {
  if (!businessNumber) return "Business Reference Number can't be empty."
  return ''
}
