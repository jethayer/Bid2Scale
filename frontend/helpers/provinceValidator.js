// Validates Province is not empty during registration
export function provinceValidator(province) {
  if (!province) return "Province can't be empty."
  return ''
}
