const express = require('express');
const cors = require('cors');
const path = require('path')
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'inicio.html'))
});

app.get('/conversor1', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'convertstring.html'))
});

app.get('/conversor2', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'convertbin.html'))
});

app.post('/binary', (req, res) => {
	const texto = req.body.string;
	console.log('Texto que chegou: ', texto);

	const buffer = Buffer.from(texto);
	const result = Array.from(buffer)
		.map(byte => byte.toString(2).padStart(8, '0'))
		.join(' ');

	res.json({mensagem: result});
});

// a rota string é pra depois

app.post('/string', (req, res) => {
	const binario = req.body.binary
	const byte = binario.split(' ').map(bit => parseInt(bit, 2))

	const texto = Buffer.from(byte).toString('utf-8')

	res.json({ mensagem: texto });
});

module.exports = app;

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log('[*] SERVIDOR LOCAL ONLINE NA PORTA: ', PORT);
    });
}