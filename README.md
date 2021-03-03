## Product description：

> This is a template file based on Vue 2.0



## About using



### 1. Vuex

This project uses modularity to organize `Vuex`，If you need the new store module, you just need to add the module folder under the store folder, the program will automatically retrieve and introduce the `index.js` under the folder



### 2. Vue-router

This project uses modularity to organize `Vue-router`, If you need to create a new Page in the views folder, the program will load the file automatically and you can access it directly from your route. 

* the name of the route depends on the name attribute of your page component

Examples: 

```vue
// view > demo.vue
<template>...</template>
<script>
	export default{
        name: "demo"
    }
</script>
```

- You can access it in your browser  `${host}:${port}/#/demo`
- You can jump on the program `this.router.push(demo)`



###  3. componets

####	3-1. svg-icon

>  ICON material for this project uses [iconfont](https://www.iconfont.cn/) library, and is introduced in the symbol way

- Create: You need to download the project on the [iconfont](https://www.iconfont.cn/), And copy the folder to the project's `src>assets>iconfont` folder, The program automatically loads the material in that directory
- Use:  You can import the component where you want it,  And Pass in a icon-name, which you need to get on iconfont

Examples:  

```vue
<template>
	<svg-icon icon="xxxx"></svg-icon>
</template>
```



### 4. websocket

> This project encapsulates websocket, It includes offline reconnection, heartbeat detection and more

- init: You need to ` import { create } from '@/api/websocket/index.js'`,And `create(${url})`

- send:  You need to ` import { sendMessage} from '@/api/websocket/sendMessage.js'`

  Examples:

  ```js
  import { sendMessage} from '@/api/websocket/sendMessage.js'
  const param = {
      id: 1000, //required
      //....
  }
  sendMessage(params, response => {
      console.log(response)
  })
  ```

  > Each param needs to have a unique id attribute, and callback is automatically called when the request is responded to



###  5.axios

> This project provides the infrastructure for axios(Interceptor/baseURL). You can change it in the `src > utils > request` 



###  6. request API

> All program requests are placed at `src > api`, You can refer to the `member.js `

