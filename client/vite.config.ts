import { loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import AutoImport from "unplugin-auto-import/vite"
import WindiCSS from 'vite-plugin-windicss'
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
const root = process.cwd()
function pathResolve(dir: string) {
  return resolve(root, '.', dir)
}
export default ({ command, mode }: ConfigEnv): UserConfig => {
  let env = {} as any
  const isBuild = command === 'build'
  if (!isBuild) {
    env = loadEnv(process.argv[3] === '--mode' ? process.argv[4] : process.argv[3], root)
  } else {
    env = loadEnv(mode, root)
  }
  return {
    plugins: [
      vue(),
      WindiCSS(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: "src/auto-import.d.ts",
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        dts: "src/element-plus.d.ts"
      }),
    ],
    resolve: {
      alias: [
        {
          find: /\@\//,
          replacement: `${pathResolve('src')}/`
        }
      ]
    },
    server: {
      port: 4001,
      proxy: {
        '/api': {
          target: 'http://10.102.220.155:10000',
          changeOrigin: true,
        }
      },
      hmr: {
        overlay: false
      },
    }
  }
}
