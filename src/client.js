const dgram = require('dgram'); //importa o mesmo modulo dgram do server p fzr a comunic
const readline = require('readline');// importa um modulo p lidar com saida e entrada de texto no terminal

const client = dgram.createSocket('udp4');
const rl = readline.createInterface({ //cria uma interface de leitura e escrita p interagir com cliente
  input: process.stdin, //entrada padrao
  output: process.stdout //saida padrao
});

const SERVER_HOST = 'localhost'; //endereco do server
const SERVER_PORT = 8000;

client.on('message', (msg) => {
  console.log(`\n${msg.toString()}\n> `);
});

console.log('=== CLIENTE DO CHAT UDP ===');

rl.question('Digite seu nome: ', (username) => { //pede o nome do cliente e executa callback
  client.send(username, SERVER_PORT, SERVER_HOST); //envia nome p servidor 
  
  console.log(`\nBem-vindo(a) ao chat, ${username}!`);
  
  rl.on('line', (message) => { //evento p verificar envio de mesg
    client.send(message, SERVER_PORT, SERVER_HOST); //envia a mensagem
    rl.prompt();//prompt p enviar uma nova msg
  });
  
  rl.prompt();
});
