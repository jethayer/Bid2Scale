// Validates company name is not empty during registration
export function companyNameValidator(companyName) {
  if (!companyName) return "Company name can't be empty."
  return ''
}
