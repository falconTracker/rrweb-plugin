# @falcontracker/rrweb-plugin

在捕获的错误信息中添加上 rrweb 页面录制功能，用于方便查看错误产生根源。

## 安装

```shell
npm i @falcontracker/rrweb-plugin --save-dev
```

## 接入到 sdk 中


需要在 init 函数中配置开启页面录制

```js
import { init } from '@falcontracker/sdk';
import { createRrwebPlugin } from '@falcontracker/rrweb-plugin';

init({
    appId: 'xxxx',
    extra: {
        screenRecord: true,
    },
    plugins: [ createRrwebPlugin() ]
})
```