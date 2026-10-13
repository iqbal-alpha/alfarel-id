const path = require('path');
const fs = require('fs');

const projectDir = path.resolve(__dirname, '../..');
const sessionDir = path.join(projectDir, '.superpowers', 'brainstorm', 'session-1');
const contentDir = path.join(sessionDir, 'content');
const stateDir = path.join(sessionDir, 'state');

fs.mkdirSync(contentDir, { recursive: true });
fs.mkdirSync(stateDir, { recursive: true });

process.env.BRAINSTORM_DIR = sessionDir;
process.env.BRAINSTORM_PORT_FILE = path.join(projectDir, '.superpowers', 'brainstorm', '.last-port');
process.env.BRAINSTORM_TOKEN_FILE = path.join(projectDir, '.superpowers', 'brainstorm', '.last-token');
process.env.BRAINSTORM_OPEN = '1';

const server = require(path.join(projectDir, '.agents', 'skills', 'brainstorming', 'scripts', 'server.cjs'));
server.startServer();
