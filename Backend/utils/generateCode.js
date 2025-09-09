import crypto from 'crypto';

const generateCode = (length = 6) => {
  const bytes = crypto.randomBytes(length * 2);
  return bytes.toString('base64url').slice(0, length);
};

export default generateCode;
