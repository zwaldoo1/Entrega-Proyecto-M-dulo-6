const path = require('path');
const { readLogs, saveLog } = require('../services/log.service');

const getHome = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
};

const getAbout = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'about.html'));
};

const getContact = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'contact.html'));
};

const getStatus = (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Servidor funcionando correctamente',
    port: process.env.PORT || 3000,
    timestamp: new Date().toISOString()
  });
};

const getVisits = (req, res) => {
  const logs = readLogs();

  res.status(200).json({
    status: 'ok',
    message: 'Registros obtenidos correctamente',
    total: logs.length,
    data: logs
  });
};

const postContact = (req, res) => {
  const { nombre, correo, mensaje } = req.body;

  if (!nombre || !correo || !mensaje) {
    return res.status(400).json({
      status: 'error',
      message: 'Todos los campos son obligatorios',
      data: null
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(correo)) {
    return res.status(400).json({
      status: 'error',
      message: 'El correo ingresado no es válido',
      data: null
    });
  }

  const contactoLog = `Formulario enviado | Nombre: ${nombre} | Correo: ${correo} | Mensaje: ${mensaje}`;
  saveLog(contactoLog);

  return res.status(200).json({
    status: 'ok',
    message: 'Formulario recibido correctamente',
    data: {
      nombre,
      correo,
      mensaje
    }
  });
};

module.exports = {
  getHome,
  getAbout,
  getContact,
  getStatus,
  getVisits,
  postContact
};