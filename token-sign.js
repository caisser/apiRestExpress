const jwt = require('jsonwebtoken');

// Llave secreta para firmar y verificar
const secret = 'llaveSecretaParaFirmar';
// lo que voy a encriptar, debe ser un objeto que tenga sub(udentificar el usuario)
const payload = {
  sub: 1,
  role: 'customer'
}

function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);
console.log(token);
