// crypto module
const crypto = require("crypto");

const algorithm = "aes-256-cbc"; 

// generate 16 bytes of random data
const initVector = crypto.randomBytes(8).toString('hex');

// protected data
const message = require('fs').readFileSync(process.argv.slice(2).join(' '), 'utf8');
console.log(message)
// secret key generate 32 bytes of random data
const Securitykey = crypto.randomBytes(16).toString('hex');

// the cipher function
// console.log(`key: ${Securitykey}, init: ${initVector}`)
const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

// encrypt the message
// input encoding
// output encoding
let encryptedData = cipher.update(message, "utf-8", "hex");

encryptedData += cipher.final("hex");
console.log(`key: ${Securitykey}, init: ${initVector}`)
console.log(`
const crypto = require('crypto');const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(process.env.key), Buffer.from(process.env.init));let decryptedData = decipher.update(${JSON.stringify(encryptedData)}, "hex", "utf-8");decryptedData += decipher.final("utf8");eval(decryptedData)
`)