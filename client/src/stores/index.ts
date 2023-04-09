import type { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersit from 'pinia-plugin-persist'
const pinia = createPinia()
pinia.use(piniaPluginPersit)
export const setupStore = (app: App<Element>) => {
  app.use(pinia)
}
export { pinia }