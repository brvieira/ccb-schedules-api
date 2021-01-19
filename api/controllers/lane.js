"use strict";

const services = (db) => {
  const collection = db.collection("lane");

  const listAllNumbers = async () => {
    try {
      const data = await collection.find({}).sort({ senha: 1 }).toArray();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const getNumbers = async (number) => {
    try {
      if (typeof number !== "number") number = parseInt(number);
      const data = await collection.find({ senha: number }).toArray();

      return data;
    } catch (error) {
      throw error;
    }
  };

  const getLaneByServiceAndType = async (id, type) => {
    try {
      const filter = {
        culto_id: id,
        tipo: type,
      };
      const data = await collection.find(filter).sort({ senha: 1 }).toArray();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const getNumbersCountByService = async (serviceId) => {
    try {
      if (typeof serviceId !== "string") serviceId = serviceId.toString();

      const pipeline = [
        {
          $match: {
            culto_id: serviceId,
          },
        },
        {
          $group: {
            _id: "$tipo",
            count: {
              $sum: 1,
            },
          },
        },
      ];

      const data = await collection.aggregate(pipeline).toArray();

      let result = {
        culto_id: serviceId,
      };

      data.map((tipo) => {
        result[tipo._id] = tipo.count;
      });

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const createNumberToService = async (body) => {
    try {
      const number = await getValueForNextSequence("senha");

      const serviceNumberObj = {
        senha: number,
        status: false,
        culto_id: body.culto_id,
      };

      const brothers = fillArray(
        { ...serviceNumberObj, tipo: "irmao" },
        body.irmaos
      );

      const sisters = fillArray(
        { ...serviceNumberObj, tipo: "irma" },
        body.irmas
      );

      const allRequestNumbers = brothers.concat(sisters);

      const data = await collection.insertMany(allRequestNumbers, {
        ordered: true,
      });

      return { ...serviceNumberObj, ...body };
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteNumberToService = async (number) => {
    try {
      if (typeof number !== "number") number = parseInt(number);
      const data = await collection.deleteMany({ senha: number });
      return data;
    } catch (error) {
      throw error;
    }
  };

  const deleteAndCreateNew = async (body) => {
    try {
      const oldDeleted = await deleteNumberToService(body.oldNumber);
      const newNumber = await createNumberToService(body.newData);

      return newNumber;
    } catch (error) {
      throw error;
    }
  };

  const getValueForNextSequence = async (sequenceName) => {
    try {
      const sequenceDoc = await db
        .collection("sequence")
        .findOneAndUpdate(
          { _id: sequenceName },
          { $inc: { sequence_value: 1 } },
          { upsert: true }
        );

      return sequenceDoc.value.sequence_value;
    } catch (error) {
      throw error;
    }
  };

  const fillArray = (value, len) => {
    var arr = [];
    for (var i = 0; i < len; i++) {
      const obj = {
        ...value,
        _id: new Date().getTime() * Math.floor(Math.random() * 100000),
      };
      arr.push(obj);
    }
    return arr;
  };

  return {
    createNumberToService,
    getNumbersCountByService,
    deleteNumberToService,
    getNumbers,
    deleteAndCreateNew,
    getLaneByServiceAndType,
  };
};

module.exports = services;
