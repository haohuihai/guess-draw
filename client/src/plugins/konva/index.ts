import { App } from 'vue'
import VueKonva from 'vue-konva'

export const setupVueKonva = (app: App<Element>) => {
  app.use(VueKonva)
}
