import CryptoJS from "crypto-js";

const SecretKey = "SecretKeyForEncryption";

export const decodeParams = (encodedParams: string): string => {
  const bytes = CryptoJS.AES.decrypt(
    decodeURIComponent(encodedParams),
    SecretKey
  );
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Ganti dengan kunci rahasia yang lebih aman
export const encodeParams = (params: string): string => {
  const ciphertext = CryptoJS.AES.encrypt(params, SecretKey).toString();
  return encodeURIComponent(ciphertext);
};
