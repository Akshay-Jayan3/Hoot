// preload.js
const { contextBridge, ipcRenderer } = require('electron');
const {
  GET_ALL,
  GET_BY_ID,
  GET_BY_FIELD,
  ADD,
  DELETE_BY_ID,
  UPDATE_BY_ID,
  SELECT_FOLDER
} = require("./constants");

contextBridge.exposeInMainWorld('electron', {
  selectFolder: () => ipcRenderer.invoke(SELECT_FOLDER),
  getallEntities:(modelName) => ipcRenderer.invoke(GET_ALL,modelName),
  getentityById:(modelName, id) => ipcRenderer.invoke(GET_BY_ID,modelName, id),
  getentityByField:(modelName, value) => ipcRenderer.invoke(GET_BY_FIELD,modelName, value),
  updateEntity:(modelName, id, updatedData) => ipcRenderer.invoke(UPDATE_BY_ID,modelName, id, updatedData),
  deleteEntity:(modelName,id) => ipcRenderer.invoke(DELETE_BY_ID,modelName,id),
  addentity:(modelName,data) => ipcRenderer.invoke(ADD,modelName,data),
  fs: require('fs'),
  path:require('path')
});
