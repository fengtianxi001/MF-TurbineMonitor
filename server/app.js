const { fetchIp, randomNumber } = require("./utils");
const ws = require("./websocket");
const websocket = new ws();
websocket.get("temperatures", (socket, data) => {
  setInterval(() => {
    const mockData = {
      ...data,
      data: {
        gearCase: randomNumber(100),
        cabin: randomNumber(100),
        ev: randomNumber(100),
      },
    };
    socket.send(JSON.stringify(mockData));
  }, 5000);
});
websocket.get("monthlyPower", (socket, data) => {
  setInterval(() => {
    const mockData = {
      ...data,
      data: new Array(12).fill(0).map((item, index) => ({
        label: `#${index + 1}`,
        value: randomNumber(100),
      })),
    };
    socket.send(JSON.stringify(mockData));
  }, 5000);
});
websocket.get("totalData", (socket, data) => {
  setInterval(() => {
    const mockData = {
      ...data,
      data: new Array(7).fill(0).reduce((prev, cur, index) => {
        prev[index + 1] = [randomNumber(50), randomNumber(50)];
        return prev;
      }, {}),
    };
    socket.send(JSON.stringify(mockData));
  }, 5000);
});

websocket.listen(8888, () => {
  const ip = fetchIp();
  console.log(`running at ${ip}:8888`);
});
