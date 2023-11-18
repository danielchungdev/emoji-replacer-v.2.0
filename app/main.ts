const readline = require('readline');

readline.emitKeypressEvents(process.stdin);

if (process.stdin.isTTY)
    process.stdin.setRawMode(true);

process.stdin.on('keypress', (chunk, key) => {
  if (key.sequence === '\x03'){
    process.exit();
  }
  console.log({chunk, key});
});