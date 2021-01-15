"use strict";

const { ObjectId } = require("mongodb");

const services = (db) => {
  const collection = db.collection("services");

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
        .find({ tipo_servico: type })
        .sort({ data: 1 })
        .toArray();

      const service = data.find(
        (serv) =>
          serv.senhas_irmaos.length < serv.irmaos ||
          serv.senhas_irmas < serv.irmas
      );
      return service;
    } catch (error) {
      throw error;
    }
  };

  const createService = async (body) => {
    try {
      const data = await collection.insertOne(body);
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
  };
};

module.exports = services;
