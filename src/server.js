const dgram = require('dgram'); //importa modulo do node

const server = dgram.createSocket('udp4'); //criou um socket udp ipv4 
const clients = {}; //criou um objeto vazio p armazenar info dos clientes

server.on('message', (msg, rinfo) => { //define evento que aciona quando o servidor recebe uma mensagem
  const message = msg.toString();
  const clientId = `${rinfo.address}:${rinfo.port}`; //rinfo é info do remetente (ip e porta)
  
  if (!clients[clientId]) { //ve se o cliente ja ta registrado, se tiver não pede p colocar o nome
    clients[clientId] = message;
    console.log(`${message} entrou no chat!`);
    
    for (const id in clients) {
      if (id !== clientId) {
        server.send(`${message} entrou no chat!`, ...id.split(':'));
      }
    }
  } else {
    console.log(`${clients[clientId]}: ${message}`);
    
    for (const id in clients) {
      if (id !== clientId) {
        server.send(`${clients[clientId]}: ${message}`, ...id.split(':'));
      }
    }
  }
});

server.on('listening', () => { //servidor escutando 
  console.log(`Servidor iniciado em localhost:8000`); //exibe qnd inicia o server
});

server.bind(8000); //porta
