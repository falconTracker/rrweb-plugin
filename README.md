# @falcontracker/rrweb-plugin

在捕获的错误信息中添加上 rrweb 页面录制功能，用于方便查看错误产生根源。

## 安装

```shell
npm i @falcontracker/rrweb-plugin --save-dev
```

## 接入到 sdk 中

需要在 init 函数中配置开启页面录制，在出现错误（js 错误）的时候会将录制的内容放入到错误数据中。

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


## 错误数据示例

```js
{
  appId: 'xxx',
  timeStamp: 12345678,
  catagory: 'error',
  type: 'error',
  markUser: 'ISq8gNXMBv1740628511799',
  markUv: '5wAVeIdMXt1740628511799',
  markPage: 'gt3E7cFACa1740641321522',
  url: 'http://xxx.com/b',
  error: {
    isTrusted: true,
    bubbles: false,
    cancelBubble: false,
    //   ...
    // 更多可以查看 ErrorEvent
  },
  stackFrames: [
    {
      columnNumber: 9,
      fileName: 'http://xxx.com/index.js',
      functionName: 'throwError',
      lineNumber: 211,
      source: '    at throwError (http://xxx.com/index.js:211:9)',
    },
  ],
  SDKVersion: '0.0.4',
  agentInfo: {
    browser: 'Chrome',
    device: 'pc',
    os: 'Windows',
    os_version: '10.0',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0',
    version: '133.0.0.0',
  },
  screenRecords: 'xxxx'
}
```