# 关于wesocket的使用方法

## 启动websocket连接

`
    import createSocket from "../websocket/index.js"
    createSocket()
`

## 发送

`
    import { sendMessage } from "../websocket/sendMessage.js"
    const param = {
        id: 1000, // required
        //...
    }
    sendMessage(param,(respone) => {
        console.log(respone)
    })
`
