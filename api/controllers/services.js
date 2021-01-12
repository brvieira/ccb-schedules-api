"use strict";

const { ObjectId } = require("mongodb");

const services = (db) => {
  const collection = db.collection("services");

  const listAllServices = async () => {
    try {
      const data = await collection.find({}).toArray();
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
  };
};

module.exports = services;
