import { getAuth, validatePassword } from "firebase/auth";

const status = await validatePassword(getAuth(), passwordFromUser);
if (!status.isValid) {
  // Password could not be validated. Use the status to show what
  // requirements are met and which are missing.

  // If a criterion is undefined, it is not required by policy. If the
  // criterion is defined but false, it is required but not fulfilled by
  // the given password. For example:
  const needsLowerCase = status.containsLowercaseLetter !== true; // true if lowercase letters are required but missing
}