"use strict";

const messages = (db) => {
  const collection = db.collection("messages");

  const createMessage = (data) => {
    data.timestamp = new Date().getTime();
    return collection.insertOne(data);
  };

  const getMessages = () => {
    return collection.find({}).sort({ timestamp: -1 }).toArray();
  };

  const updateMessage = async (data) => {};

  const deleteMessage = async (id) => {};

  return { createMessage, getMessages };
};

module.exports = messages;
