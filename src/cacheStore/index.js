const {
  getallEntities,
  addentity,
  getentityById,
  getentityByField,
  updateEntity,
  deleteEntity,
  deleteAllentity,
  addsongtoPlaylist,
  getsongfromPlaylist,
  removeSongfromplaylist,
} = window.electron;

const getAllEntities = async (modelName) => {
  try {
    const entities = await getallEntities(modelName);
    return {
      status: "s",
      data: entities,
      message: "Songs retrieved from db successfully",
    };
  } catch (error) {
    console.error(`Error getting entities for ${modelName}:`, error.message);
  }
};

const getEntityById = async (modelName, id) => {
  try {
    const entity = await getentityById(modelName, id);
    console.log(`Entity retrieved for ${modelName} with ID ${id}:`, entity);
  } catch (error) {
    console.error(
      `Error getting entity for ${modelName} with ID ${id}:`,
      error.message
    );
  }
};

const getEntityByField = async (modelName, value) => {
  try {
    const entity = await getentityByField(modelName, value);
    console.log(
      `Entity retrieved for ${modelName} with value ${value}:`,
      entity
    );
  } catch (error) {
    console.error(
      `Error getting entity for ${modelName} with value ${value}:`,
      error.message
    );
  }
};

const getSongsFromplaylist = async (modelName, modelName2) => {
  try {
    const entity = await getsongfromPlaylist(modelName, modelName2);
    return {
      status: "s",
      data: entity,
      message: "Songs retrieved from db successfully",
    };
  } catch (error) {
    console.error(`Error getting entity for ${modelName}}:`, error.message);
  }
};

const addEntity = async (modelName, data) => {
  try {
    const result = await addentity(modelName, data);

    if (result.status === "S") {
      console.log("Success:", result.message);
      return { success: true, message: result.message, data: result.data };
    } else {
      console.error("Error:", result.message);
      throw new Error(result.message);
    }
  } catch (error) {
    console.error(`Error adding entity for ${modelName}:`, error.message);
  }
};

const addsongsToplaylist = async (
  modelName,
  modelName2,
  playlistId,
  songId
) => {
  try {
    const result = await addsongtoPlaylist(
      modelName,
      modelName2,
      playlistId,
      songId
    );

    if (result.status === "S") {
      console.log("Success:", result.message);
      return { success: true, message: result.message, data: result.data };
    } else {
      console.error("Error:", result.message);
      throw new Error(result.message);
    }
  } catch (error) {
    console.error(`Error adding entity for ${modelName}:`, error.message);
  }
};

const removeSongfromPlaylist = async (
  modelName,
  modelName2,
  playlistId,
  songId
) => {
  try {
    const result = await removeSongfromplaylist(
      modelName,
      modelName2,
      playlistId,
      songId
    );

    if (result?.status === "S") {
      console.log("Success:", result?.message);
      return { success: true, message: result.message, data: result.data };
    } else {
      console.error("Error:", result?.message);
      throw new Error(result.message);
    }
  } catch (error) {
    console.error(`Error deleting entity for ${modelName}:`, error.message);
  }
};

const updateEntityById = async (modelName, id, updatedData) => {
  try {
    const updatedEntity = await updateEntity(modelName, id, updatedData);
    console.log(
      `Entity updated for ${modelName} with ID ${id}:`,
      updatedEntity
    );
  } catch (error) {
    console.error(
      `Error updating entity for ${modelName} with ID ${id}:`,
      error.message
    );
  }
};

const deleteEntityById = async (modelName, id) => {
  try {
    const deleted = await deleteEntity(modelName, id);
    console.log(`Entity deleted for ${modelName} with ID ${id}`, deleted);
  } catch (error) {
    console.error(
      `Error deleting entity for ${modelName} with ID ${id}:`,
      error.message
    );
  }
};
const deleteALLEntity = async (modelName, id) => {
  try {
    const deleted = await deleteAllentity(modelName);
    console.log(`Entity deleted for ${modelName}`, deleted);
  } catch (error) {
    console.error(`Error deleting entity for ${modelName}:`, error.message);
  }
};

export {
  getAllEntities,
  getEntityById,
  getEntityByField,
  addEntity,
  updateEntityById,
  deleteEntityById,
  deleteALLEntity,
  addsongsToplaylist,
  removeSongfromPlaylist,
  getSongsFromplaylist,
};
