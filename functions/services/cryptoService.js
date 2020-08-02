sha256 = require('sha256');

const secret = "igiXyX2yCoS_DrKxzftVPw";

exports.getEncryptedText = (text) => {
  return sha256(`${text}${secret}`);
};

exports.assertEncryptedText = (text, encryptedText) => {
  return encryptedText === getEncryptedText(text);
}
