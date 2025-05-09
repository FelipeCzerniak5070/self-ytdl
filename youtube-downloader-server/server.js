const express = require('express');
const cors = require('cors');
const ytdl = require('youtube-dl-exec');
const { output } = require('@angular/core');
// Removendo importações não utilizadas ou problemáticas
// const { pipe } = require('rxjs');
// const ffmpeg = require('ffmpeg');
// const { output } = require('@angular/core');
// const { resolveModuleName } = require('typescript');


const options = {
  extractAudio:true,
  audioFormat:'mp3',
  dumpSingleJson: true,
  noCheckCertificates: true,
  noWarnings: true,
  preferFreeFormats: true,
  o:'%(title)s.%(ext)s'
};

const app = express();
const port = 3000;

function downloadJson(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

app.use(cors()); // Habilita o CORS para permitir requisições do Angular
app.use(express.json()); // Middleware para analisar corpos de requisição JSON

app.post('/teste', async (req, res) => {
    res.send('Teste');
});

app.post('/download', async (req, res) => {
    const url = req.body.url;
    console.log('Recebida requisição em /download | URL: ' + url);

    try {
        const output = ytdl(url, options)
        .then(output => {
            console.log("Download iniciado! url: "+url)
        });


        

        // Envia o stdout do youtube-dl como o corpo da resposta (já é um Buffer)
        res.send(output.stdout);
        
        console.log('----------------------Fim-----------------------')

    } catch (error) {
        console.error('Erro ao baixar o áudio:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao baixar o áudio.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});