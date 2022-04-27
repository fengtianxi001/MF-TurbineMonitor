import { WSURL } from "../configs/websocket";
import { isFunction } from "lodash-es";
import { sendMessagePropsType, mapValue } from "./types";

class MyWebsocket {
  socket: WebSocket | null;
  url: string;
  map: Map<string, mapValue>;
  constructor(url: string) {
    this.url = url;
    this.socket = new WebSocket(url);
    this.map = new Map();
    this.createSocket();
  }
  createSocket() {
    if (!this.socket) {
      this.socket = new WebSocket(this.url);
    }
    this.socket.onopen = this.onOpen;
    this.socket.onclose = this.onClose;
    this.socket.onerror = this.onError;
    this.socket.onmessage = (e) => {
      this.onMessage(e);
    };
  }
  reConnecting() {
    if (this.socket?.readyState !== 3) {
      console.log("websocket尝试重连中...");
      this.socket = null;
      this.createSocket();
    }
  }
  private onOpen() {
    console.log("websocket已连接");
  }
  private onClose() {
    console.log("websocket连接已断开");
    this.socket?.close();
  }
  private onError() {
    console.log("websocket连接出错");
    this.reConnecting();
  }
  onMessage(e: any) {
    const data = JSON.parse(e.data);
    const type = data.type;
    const events = this.map.get(type) || {};
    Object.values(events).map((callback) => {
      isFunction(callback) && callback(data);
    });
    // console.log(events);
    // events.map(({ callback }) => {
    //   isFunction(callback) && callback(data);
    // });
  }
  subscribe(data: sendMessagePropsType, onMessageCallback: (arg: any) => void) {
    if (this.socket !== null && this.socket?.readyState === 3) {
      this.socket.close();
      this.createSocket();
    } else if (this.socket?.readyState === 1) {
      this.sendMessage(data, onMessageCallback);
    } else if (this.socket?.readyState === 0) {
      setTimeout(() => {
        this.subscribe(data, onMessageCallback);
      }, 1000);
    }
  }
  disSubscribe(type: string, id: number) {
    const events = this.map.get(type) || {};
    delete events[id];
    this.map.set(type, events);
  }
  private sendMessage(
    data: sendMessagePropsType,
    onMessageCallback: (arg: any) => void
  ) {
    const { id, type } = data;
    const events = this.map.get(type) || {};
    events[id] = onMessageCallback;
    this.map.set(type, events);
    this.socket?.send(JSON.stringify(data));
    console.log("成功发送消息:", JSON.stringify(data, null, 2));
  }
}
export default MyWebsocket;
