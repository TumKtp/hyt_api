const CryptoJS = require("crypto-js");

exports.securePassword = (password, salt) => {
  const sha256 = CryptoJS.algo.SHA256.create();
  sha256.update(password, "utf-8");
  sha256.update(CryptoJS.SHA256(salt), "utf-8");
  const hash = sha256.finalize().toString();
  return hash;
};
