import { contextBridge, ipcRenderer } from 'electron'

import { executeInTerminal, getCpuInfo, getMemory, getProcesses, getUsb, getMotherBoard, getCpuUsage, getCpuSummary } from './utils'

export const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.sendMessage`
   */

  sendMessage: (message: string) => {
    ipcRenderer.send('message', message)
  },

  getCPU: async () => {
    return await getCpuInfo()
  },
  
  getCpuSummary: async () => {
    return await getCpuSummary()
  },

  getCPUUsage: async () => {
    return await getCpuUsage()
  },

  getMemory: async () => {
    return await getMemory()
  },

  getProcesses: async () => {
    return await getProcesses()  
  },

  getUsb: async () => {
    return await getUsb()
  },

  getMotherBoard: async () => {
    return await getMotherBoard()
  },
 
  executeInTerminal: async (command: string) => {
    return await executeInTerminal(command)
  },

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  }
}

contextBridge.exposeInMainWorld('Main', api)
