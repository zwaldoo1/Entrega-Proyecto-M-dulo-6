const { saveLog } = require('../services/log.service');

const loggerMiddleware = (req, res, next) => {
  const now = new Date();

  const fecha = now.toLocaleDateString('es-CL');
  const hora = now.toLocaleTimeString('es-CL');
  const metodo = req.method;
  const ruta = req.originalUrl;

  const logMessage = `Fecha: ${fecha} | Hora: ${hora} | Método: ${metodo} | Ruta: ${ruta}`;

  saveLog(logMessage);
  next();
};

module.exports = loggerMiddleware;