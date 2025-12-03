const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

packageJson.scripts['start:blog'] = 'npm run build:server && node dist/server/src/main.js';
packageJson.scripts['dev:full'] = 'concurrently "npm run dev" "npm run start:blog"';
packageJson.scripts['build:server'] = 'tsc -p tsconfig.server.json && node scripts/copy-views.js';

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2) + '\n');
console.log('package.json updated successfully');
