sha256 = require('sha256');

const secret = "igiXyX2yCoS_DrKxzftVPw";

const getEncryptedText = (text) => {
  return sha256(`${text}${secret}`);
};

exports.getEncryptedText = getEncryptedText;

exports.assertEncryptedText = (text, encryptedText) => {
  return encryptedText === getEncryptedText(text);
}
