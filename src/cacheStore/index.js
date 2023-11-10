const { ipcRenderer } = require('electron');
const {
    GET_ALL,
    GET_BY_ID,
    GET_BY_FIELD,
    ADD,
    DELETE_BY_ID,
    UPDATE_BY_ID,
  } = require("./constants");

const getAllEntities = async (modelName) => {
  try {
    const entities = await ipcRenderer.invoke(GET_ALL, modelName);
    console.log(`Entities retrieved for ${modelName}:`, entities);
  } catch (error) {
    console.error(`Error getting entities for ${modelName}:`, error.message);
  }
};

const getEntityById = async (modelName, id) => {
  try {
    const entity = await ipcRenderer.invoke(GET_BY_ID, modelName, id);
    console.log(`Entity retrieved for ${modelName} with ID ${id}:`, entity);
  } catch (error) {
    console.error(`Error getting entity for ${modelName} with ID ${id}:`, error.message);
  }
};

const getEntityByField = async (modelName, value) => {
  try {
    const entity = await ipcRenderer.invoke(GET_BY_FIELD, modelName, value);
    console.log(`Entity retrieved for ${modelName} with value ${value}:`, entity);
  } catch (error) {
    console.error(`Error getting entity for ${modelName} with value ${value}:`, error.message);
  }
};

const addEntity = async (modelName, data) => {
  try {
    const addedEntity = await ipcRenderer.invoke(ADD, modelName, data);
    console.log(`Entity added for ${modelName}:`, addedEntity);
  } catch (error) {
    console.error(`Error adding entity for ${modelName}:`, error.message);
  }
};

const updateEntityById = async (modelName, id, updatedData) => {
  try {
    const updatedEntity = await ipcRenderer.invoke(DELETE_BY_ID, modelName, id, updatedData);
    console.log(`Entity updated for ${modelName} with ID ${id}:`, updatedEntity);
  } catch (error) {
    console.error(`Error updating entity for ${modelName} with ID ${id}:`, error.message);
  }
};

const deleteEntityById = async (modelName, id) => {
  try {
    await ipcRenderer.invoke(UPDATE_BY_ID, modelName, id);
    console.log(`Entity deleted for ${modelName} with ID ${id}`);
  } catch (error) {
    console.error(`Error deleting entity for ${modelName} with ID ${id}:`, error.message);
  }
};

export {
  getAllEntities,
  getEntityById,
  getEntityByField,
  addEntity,
  updateEntityById,
  deleteEntityById,
};
