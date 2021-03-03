import { sendMessage } from "./sendMessage";
import { onMessage} from "./onMessage"
let Socket = ''
let setIntervalWesocketPush = null
let global_url = "ws://localhost:8888/10001"
export const createSocket = url => {
    Socket && Socket.close()
    if (!Socket) {
        console.log('建立websocket连接')
        url = url || global_url
        Socket = new WebSocket(url)
        Socket.onopen = onopenWS
        Socket.onmessage = onMessage
        Socket.onerror = onerrorWS
        Socket.onclose = oncloseWS
    } else {
        // console.log('websocket已连接')
    }
}

/**打开WS之后发送心跳 */
const onopenWS = () => {
    sendPing()
    console.log("websocket已连接")
}

/**连接失败重连 */
const onerrorWS = () => {
    Socket.close()
    clearInterval(setIntervalWesocketPush)
    console.log('连接失败重连中')
    if (Socket.readyState !== 3) {
        Socket = null
        createSocket()
    }
}



/**
 * 发送数据但连接未建立时进行处理等待重发
 * @param {any} message 需要发送的数据
 */
const connecting = message => {
    setTimeout(() => {
        if (Socket.readyState === 0) {
            connecting(message)
        } else {
            Socket.send(JSON.stringify(message))
        }
    }, 1000)
}



/**断开重连 */
const oncloseWS = () => {
    clearInterval(setIntervalWesocketPush)
    console.log('websocket已断开....正在尝试重连')
    if (Socket.readyState !== 2) {
        Socket = null
        createSocket()
    }
}
/**发送心跳
 * @param {number} time 心跳间隔毫秒 默认5000
 * @param {string} ping 心跳名称 默认字符串ping
 */
export const sendPing = (time = 5000, ping = 'ping') => {
    clearInterval(setIntervalWesocketPush)
    Socket.send(ping)
    setIntervalWesocketPush = setInterval(() => {
        Socket.send(ping)
    }, time)
}

/**
 * 发送数据
 * @param {any} message 需要发送的数据
 */
export const sendWSPush = (message,callback) => {
    if (Socket !== null && Socket.readyState === 3) {
        Socket.close()
        createSocket()
    } else if (Socket.readyState === 1) {
        sendMessage(Socket, message, callback)
        // Socket.send(JSON.stringify(message))
    } else if (Socket.readyState === 0) {
        connecting(message)
    }
}
