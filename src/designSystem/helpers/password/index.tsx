export namespace PasswordLibrary {
  export function analyse(password: string): {
    isLengthOk: boolean
    hasUppercaseLetter: boolean
    hasNumber: boolean
    hasSpecialCharacter: boolean
  } {
    const passwordEnsured = password ?? ''

    const REGEX_UPPERCASE = /[A-Z]/g
    const REGEX_NUMBER = /\d/g
    const REGEX_SPECIAL_CHARACTER = /[^a-zA-Z0-9\s]/g

    const isLengthOk = passwordEnsured.length >= 8
    const hasUppercaseLetter = REGEX_UPPERCASE.test(passwordEnsured)
    const hasNumber = REGEX_NUMBER.test(passwordEnsured)
    const hasSpecialCharacter = REGEX_SPECIAL_CHARACTER.test(passwordEnsured)

    return {
      isLengthOk,
      hasUppercaseLetter,
      hasNumber,
      hasSpecialCharacter,
    }
  }
}
