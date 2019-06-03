const operations = require('./operations');
console.log(operations.var1);
console.log(operations.var2);

const funcoes = require('./funcoes.js');
const resultado = funcoes(1);
console.log(resultado.msg,resultado.value);