"use strict";

const { parse } = require("fast-csv");

const churchs = (db) => {
  const collection = db.collection("igrejas");

  const processCsv = async (csvData = []) => {
    try {
      const churchsArray = await parseCsvToJson(csvData);

      const toBeAdded = churchsArray.map((church) => ({
        ...church,
        usuarios: [],
        sequencia: 1,
        estaAtivo: false,
        mensagem: "",
      }));

      const options = {
        ordered: false,
      };

      return collection.insertMany(toBeAdded, options);
    } catch (error) {
      throw error;
    }
  };

  const parseCsvToJson = (csvData = []) =>
    new Promise((resolve, reject) => {
      let parsedToJson = [];

      const stream = parse({ headers: true, delimiter: ";" })
        .transform((data) => ({
          _id: data.codigo,
          cidade: data.cidade,
          bairro: data.bairro,
          mapaUrl: data.mapa,
        }))
        .on("error", (error) => reject(error))
        .on("data", (row) => parsedToJson.push(row))
        .on("end", (rowCount) => resolve(parsedToJson));

      stream.write(csvData);
      stream.end();
    });

  const getAllChurchs = async () => {
    try {
      const data = await collection.find({}).sort({ bairro: 1 }).toArray();

      return data;
    } catch (error) {
      throw error;
    }
  };

  const getActiveChurchs = async () => {
    try {
      const data = await collection
        .find({
          estaAtivo: true,
        })
        .sort({ bairro: 1 })
        .toArray();

      return data;
    } catch (error) {
      throw error;
    }
  };

  const getActiveChurchsCities = async () => {
    try {
      const data = await collection.distinct("cidade", {
        estaAtivo: true,
      });

      return data;
    } catch (error) {
      throw error;
    }
  };

  return {
    processCsv,
    getAllChurchs,
    getActiveChurchs,
    getActiveChurchsCities,
  };
};

module.exports = churchs;
