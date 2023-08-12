import { BASE_URL_SOCKET } from "../../ultils/socketApi";

let websocket = new WebSocket(BASE_URL_SOCKET)

const isDriver = () => {
  const user = localStorage.getItem('user')
  if (user) {
    return !!user && JSON.parse(user).role.includes('driver');
  } else {
    return false
  }
}

const auth = JSON.parse(localStorage.getItem('user'));

if (isDriver()) {
  websocket = new WebSocket(`ws://10.20.11.40:5000?id=vehicle_${auth?.vehicle?.id}`)
}

let connection_resolvers = [];
let checkConnection = () => {
  return new Promise((resolve, reject) => {
    if (websocket.readyState === WebSocket.OPEN) {
      resolve();
    }
    else {
      connection_resolvers.push({ resolve, reject });
    }
  });
}

websocket.addEventListener('open', () => {
  connection_resolvers.forEach(r => r.resolve())
});

let ws = websocket;
checkConnection().then(() => {
  ws = websocket;
});

export default ws;