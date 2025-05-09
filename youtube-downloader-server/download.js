/*const { output } = require('@angular/core');
const youtubedl = require('youtube-dl-exec')

const url = 'https://www.youtube.com/watch?v=6xKWiCMKKJg'
const options = {
  extractAudio:true,
  audioFormat:'mp3',
  dumpSingleJson: true,
  noCheckCertificates: true,
  noWarnings: true,
  preferFreeFormats: true,
  o:'%(title)s.%(ext)s',
  printJson:true
};

youtubedl(url, options).then(output => {
  console.log(JSON.stringify(output,null,2))
});*/

const youtubedl = require('youtube-dl-exec');

const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // Adicionei uma URL de exemplo
const options = {
  dumpSingleJson: true,
  noCheckCertificates: true,
  noWarnings: true,
  preferFreeFormats: true,
  o: '%(title)s.%(ext)s',
  extractAudio: true, // Removi pois dumpSingleJson geralmente não é usado com extração
  audioFormat: 'mp3',   // Removi pois dumpSingleJson geralmente não é usado com extração
};

youtubedl(url, options)
  .then(output => {
    console.log(JSON.stringify(output, null, 2)); // Imprime o JSON formatado
  })
  .catch(error => {
    console.error('Ocorreu um erro:', error);
  });
