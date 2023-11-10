const { ipcMain } = require("electron");
const dbfunctions = require("./dbfunctions");
const {
  GET_ALL,
  GET_BY_ID,
  GET_BY_FIELD,
  ADD,
  DELETE_BY_ID,
  UPDATE_BY_ID,
} = require("./constants");

ipcMain.handle(GET_ALL, async (event, modelName) => {
  try {
    const entities = await dbfunctions.getAll(modelName);
    return entities.map((item) => item.toJSON());
  } catch (error) {
    console.error(`Error getting ${modelName.name}:`, error.message);
    throw error;
  }
});

ipcMain.handle(GET_BY_ID, async (event, modelName, id) => {
  try {
    const entity = await dbfunctions.getById(modelName, id);
    return entity ? entity.toJSON() : null;
  } catch (error) {
    console.error(`Error getting ${modelName.name} by ID:`, error.message);
    throw error;
  }
});

ipcMain.handle(GET_BY_FIELD, async (event, modelName, field, value) => {
  try {
    const entity = await dbfunctions.getByField(modelName, field, value);
    return entity ? entity.toJSON() : null;
  } catch (error) {
    console.error(`Error getting ${modelName.name} by field:`, error.message);
    throw error;
  }
});

ipcMain.handle(ADD, async (event, modelName, data) => {
  try {
    const addedEntity = await dbfunctions.add(modelName, data);
    return addedEntity.toJSON();
  } catch (error) {
    console.error(`Error adding ${modelName.name}:`, error.message);
    throw error;
  }
});

ipcMain.handle(DELETE_BY_ID, async (event, modelName, id, updatedData) => {
  try {
    const updatedEntity = await dbfunctions.updateById(
      modelName,
      id,
      updatedData
    );
    return updatedEntity.toJSON();
  } catch (error) {
    console.error(`Error updating ${modelName.name} by ID:`, error.message);
    throw error;
  }
});

ipcMain.handle(UPDATE_BY_ID, async (event, modelName, id) => {
  try {
    await dbfunctions.deleteById(modelName, id);
    return { success: true };
  } catch (error) {
    console.error(`Error deleting ${modelName.name} by ID:`, error.message);
    throw error;
  }
});
