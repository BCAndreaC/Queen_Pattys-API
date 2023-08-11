const User = require('../models/User');

module.exports = {
  getUsers: async (req, resp, next) => {
    try {
      const users = await User.find();
      if (users.length === 0) {
        return next(404);
      }
      return resp.status(200).json(users);
    } catch (error) {
      next(500);
    }

    // TODO: Implementa la función necesaria para traer la colección `users`
    // Recuerda que la respuesta debe ser un arreglo de objetos
    // Si la petición falla, debes llamar al middleware `next` con el parámetro
    // `500` para que retorne un error 500
    // Si la petición es correcta, debes responder con un código `200` y la
    // colección solicitada en formato JSON
    // Si la colección está vacía, debes responder con un código `404`
  },
};
