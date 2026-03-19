const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, '..', 'logs', 'log.txt');

const saveLog = (message) => {
  fs.appendFile(logPath, message + '\n', (error) => {
    if (error) {
      console.error('Error al escribir en log.txt:', error.message);
    }
  });
};

const readLogs = () => {
  try {
    if (!fs.existsSync(logPath)) {
      return [];
    }

    const content = fs.readFileSync(logPath, 'utf-8');

    if (!content.trim()) {
      return [];
    }

    return content.trim().split('\n');
  } catch (error) {
    console.error('Error al leer log.txt:', error.message);
    return [];
  }
};

module.exports = {
  saveLog,
  readLogs
};