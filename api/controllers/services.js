"use strict";

const { ObjectId } = require("mongodb");

const services = (db) => {
  const collection = db.collection("services");
  const laneController = require("./lane")(db);

  const listAllServices = async () => {
    try {
      const data = await collection.find({}).sort({ data: 1 }).toArray();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const getService = async (id) => {
    try {
      const data = await collection.find({ _id: ObjectId(id) }).toArray();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const getServiceByType = async (type) => {
    try {
      const data = await collection
        .find({ tipo_servico: type })
        .sort({ data: 1 })
        .toArray();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const getServiceAvailableByType = async (type) => {
    try {
      const data = await collection
        .find({
          data: {
            $gte: getDate(new Date()),
          },
          tipo_servico: type,
        })
        .sort({ data: 1 })
        .toArray();

      let availService = {};

      for (const service of data) {
        const number = await laneController.getNumbersCountByService(
          service._id
        );

        if (!number.irmao) number.irmao = 0;
        if (!number.irma) number.irma = 0;

        if (number.irmao < service.irmaos || number.irma < service.irmas) {
          availService = { ...service };
          availService.senhas_irmaos = number.irmao;
          availService.senhas_irmas = number.irma;

          break;
        }
      }

      return availService;
    } catch (error) {
      throw error;
    }
  };

  const getDate = (date) => {
    const day = date.getDate(),
      month = date.getMonth() + 1,
      year = date.getYear() + 1900,
      convDat = day < 10 ? `0${day}` : day,
      convMonth = month < 10 ? `0${month}` : month;

    return `${convDat}/${convMonth}/${year}`;
  };

  const createService = async (body) => {
    try {
      const data = await collection.insertOne(body);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const getNextServiceByType = async (type) => {
    try {
      const data = await collection
        .find({
          data: {
            $gte: getDate(new Date()),
          },
          tipo_servico: type,
        })
        .sort({ data: 1 })
        .toArray();

      return data;
    } catch (error) {
      throw error;
    }
  };

  const updateService = async (body) => {
    try {
      const filter = { _id: ObjectId(body._id) };
      const options = { upsert: true };

      delete body._id;

      const updateDoc = {
        $set: { ...body },
      };

      const data = await collection.updateOne(filter, updateDoc, options);

      return data;
    } catch (error) {
      throw error;
    }
  };

  const deleteService = async (id) => {
    try {
      const data = await collection.deleteOne({ _id: ObjectId(id) });
      return data;
    } catch (error) {
      throw error;
    }
  };

  return {
    listAllServices,
    getService,
    createService,
    deleteService,
    updateService,
    getServiceByType,
    getServiceAvailableByType,
    getNextServiceByType,
  };
};

module.exports = services;
