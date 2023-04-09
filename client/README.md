页面元素

使用windiCSS
安装插件
"vite-plugin-windicss": "^1.8.7",
"windicss": "^3.5.6",
"windicss-analysis": "^0.3.5"

新建插件文件，导入项目
plugins\windi.css\index.ts
main.ts
import '@/plugins/windi.css'


新建配置文件
windi.config.ts

vite.config.ts中配置
import WindiCSS from 'vite-plugin-windicss'
plugins: [
    WindiCSS()
]