import { sha256 } from "https://denopkg.com/chiefbiiko/sha256@v1.0.2/mod.ts";

const secret = "igiXyX2yCoS_DrKxzftVPw";

export const getEncryptedText = (text) => {
  return sha256(`${text}${secret}`, "utf-8", "hex");
};

export const assertEncryptedText = (text, encryptedText) => {
  return encryptedText === getEncryptedText(text);
}