const fs = require('fs');
const content = `ADMIN_EMAIL=Jaman@myazlifresh.com
ADMIN_PASSWORD_HASH=$2b$10$TTHZjGQMhqOFAfYX8Ug4AufQBnX0QwTsLMAA7NFTefb1V34cKh4ga
JWT_SECRET_KEY=87d3de72d6a032eab8d23bcdc0cb284edb98d62517fac790376d920968e7b18d
`;
fs.writeFileSync('.env', content);
console.log('Written .env');
