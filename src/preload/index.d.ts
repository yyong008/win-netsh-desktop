import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getIps: Function
      list: Function,
      remove: Function,
      openDefaultBrowser: Function,
      getFirewallByName: Function
    }
  }
}
