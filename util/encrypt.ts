import { sha512 } from "js-sha512";

export const encryptSha512 = (text: string) => {
  var hash = sha512.create();
  hash.update(text);
  return hash.hex();
};
