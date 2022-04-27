const ws = require("ws")
class websocket {
    constructor() {
        this.map = new Map()
        this.server = null
    }
    get(type, onTrigger) {
        const events = this.map.get(type) || []
        events.push(onTrigger)
        this.map.set(type, events)
    }
    listen(port = 8888, onServe) {
        this.server = new ws.Server({port})
        typeof onServe === "function" && onServe()
        this.server.on("error", err => console.log("服务出错", err))
        this.server.on("connection", (socket) => {
            socket.on("message", (resquest) => {
                const data = JSON.parse(resquest);
                const type = data.type || ""
                const events = this.map.get(type) || []
                events.map(callback => {
                    if (typeof callback === "function") {
                        callback(socket, data)
                    }
                })
            })
        });
    }
}

module.exports = websocket
