const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
const port = 3000;

app.use(cors()); // Habilite o CORS para permitir requisições do Angular
app.use(express.json()); // Middleware para analisar corpos de requisição JSON

app.post('/download', async (req, res) => {
    const url = req.body.url;

    try {
        // Validação básica da URL
        if (!url || (!url.startsWith('http://') && !url.startsWith('https://'))) {
            console.error('URL inválida:', url);
            return res.status(400).send('URL inválida.');
        }

        console.log('Recebida requisição para /download. URL:', url);

        const info = await ytdl.getInfo(url);
        console.log('Informações do vídeo obtidas.');

        // Escolha o formato de áudio (ou vídeo, se necessário)
        const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

        if (!format) {
            console.error('Nenhum formato adequado encontrado.');
            return res.status(404).send('Nenhum formato adequado encontrado.');
        }

        console.log('Formato escolhido:', format);

        const filename = `${info.videoDetails.title}.${format.container}`;
        res.header('Content-Disposition', `attachment; filename="${filename}"`);

        // Pipa o stream diretamente para a resposta
        ytdl(url, { format: format })
            .on('error', (err) => {
                console.error('Erro ao transmitir o vídeo:', err);
                res.status(500).send('Erro ao transmitir o vídeo.');
            })
            .pipe(res);

        console.log('Download iniciado.');

    } catch (error) {
        console.error('Erro ao processar o download:', error);
        console.error(error); // Log do erro completo para depuração
        res.status(666).send('Erro ao baixar o vídeo.');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});