"use strict";
const bcrypt = require("bcrypt");

module.exports = (db) => {
  const collection = db.collection("users");

  const newUser = async (data) => {
    try {
      const query = {
        username: data.username,
      };
      const checkUser = await collection.find(query).toArray();

      if (checkUser.length > 0) {
        return { error: true, message: "Usuário já cadastrado!" };
      } else {
        const saltRounds = 8;
        data.password = await bcrypt.hash(data.password, saltRounds);
        return await collection.insertOne(data);
      }
    } catch (error) {
      console.error("Erro ao gerar hash");
      return { error: true, message: error.message };
    }
  };

  const editUser = async (data) => {
    delete data._id;
    try {
      const saltRounds = 8;
      data.senha = await bcrypt.hash(data.senha, saltRounds);
    } catch (error) {
      console.error("Erro ao gerar hash");
    } finally {
      return await collection.update({ email: data.email }, data);
    }
  };

  const login = async (data) => {
    let response = {};
    try {
      const query = {
        username: data.username,
      };
      let usuario = await collection.find(query).toArray();
      if (usuario.length > 0) {
        usuario = usuario[0];
        if (await bcrypt.compare(data.password, usuario.password)) {
          response = { status: true, usuario };
        } else {
          response = { status: false, message: "Senha Inválida!" };
        }
      } else {
        response = { status: false, message: "Usuário não cadastrado!" };
      }
    } catch (error) {
      console.error(error);
    } finally {
      return response;
    }
  };

  return {
    newUser,
    login,
    editUser,
  };
};
