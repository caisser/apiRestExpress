const jwt = require('jsonwebtoken');

// Llave secreta para firmar y verificar
const secret = 'llaveSecretaParaFirmar';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY0NTc5NTU5OH0.oRpjh6d_MmEMTH0NgJXwYzw8nVCoq3n5Fh1Qa1GLi7E';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
