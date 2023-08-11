/* eslint-disable no-console */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const User = require('../models/User');

const { secret } = config;

/** @module auth */
module.exports = (app, nextMain) => {
  /**
   * @name /auth
   * @description Crea token de autenticación.
   * @path {POST} /auth
   * @body {String} email Correo
   * @body {String} password Contraseña
   * @response {Object} resp
   * @response {String} resp.token Token a usar para los requests sucesivos
   * @code {200} si la autenticación es correcta
   * @code {400} si no se proveen `email` o `password` o ninguno de los dos
   * @auth No requiere autenticación
   */
  app.post('/auth', async (req, resp, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(400);
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return next(400);
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return next(400);
      }
      // tenia la contraseña pero no da seguridad por que se puede desencriptar
      const accessToken = jwt.sign({ uid: user.id, email: user.email, role: user.role }, secret, { expiresIn: '12h' });
      console.log(accessToken);
      resp.status(200).json({
        message: 'Autenticación correcta',
        token: accessToken,
      });
    } catch (error) {
      console.error(error);
      resp.status(500).json({
        message: 'Error al autenticar',
      });
    }

    // TODO: autenticar a la usuarix
    // Hay que confirmar si el email y password
    // coinciden con un user en la base de datos
    // Si coinciden, manda un access token creado con jwt
  });

  return nextMain();
};
