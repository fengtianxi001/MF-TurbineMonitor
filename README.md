# 🚀 Turbine-LargeScreen
<div>
  <img src="https://img.shields.io/github/languages/top/fengtianxi001/turbine_large_screen">
  <img src="https://travis-ci.org/boennemann/badges.svg?branch=master">
  <img src="https://img.shields.io/github/issues/fengtianxi001/turbine_large_screen">
  <img src="https://img.shields.io/github/forks/fengtianxi001/turbine_large_screen">
  <img src="https://img.shields.io/github/stars/fengtianxi001/turbine_large_screen">
</div>

## 简介
这是一个模仿图扑的风机大屏, 项目主要做了如下内容：
- 编写了一个简易`node-websocket`服务器, 模拟开发环境下风机数据的订阅,。使用`hooks`配合自定义`websocket`类的消息中心(发布订阅模式), 简化数据订阅和处理流程。
- 对`Three.js`的封装进行优化。
- 对导入的风机模型进行数据绑定, 使风机能够更具数据源做出相应的形态调整

## 启动

###
```shell
npm run serve
```

###
```shell
npm run dev
```


## 说明

- `master`分支版本是使用`vue3-ts-vite`对原有的`vue2`版本进行重构, 在功能和样式上会有些差异, 如果需要使用`vue2`版本, 可在切换到`vue2`分支。

- 作为一个`Demo`项目, 有许多功能需要去探索实现, 后续有学习到新的内容, 将会不断的补充和完善。


## 在线预览(版本可能落后)
[https://fengtianxi001.github.io/THREE-TurbineMonitor/](https://fengtianxi001.github.io/THREE-TurbineMonitor/)


### 效果图(版本可能落后)

![效果图](https://github.com/fengtianxi001/Three-LargeScreen/blob/main/screenshot/1.png?raw=true)




​    
​    
​    
