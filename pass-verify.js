const bcrypt = require('bcrypt');

async function verifyPassword(){
  const password = 'admin1231';
  const hash = '$2b$10$KHzjDTcUoLkYM2bibmO6x.00I0dJvAupZxJ/0j1CFEXj34Jj3g3rS';
  const isMatch = await bcrypt.compare(password, hash);
  console.log(isMatch);
}

verifyPassword();
