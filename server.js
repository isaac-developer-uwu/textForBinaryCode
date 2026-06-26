const express = require('express');
const cors = require('cors');
const path = require('path')
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'main.html'))
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
	const binario = req.body.binary;
	const binaryConverted = binario.split(' ')
	.map(binary => {
		const decimal = parseInt(binary, 2);
		return String.fromCharCode(decimal);
	})
	.join('')

	res.send(binaryConverted);
});

// 26: pega o binario que o front enviou
// 27: retira os espaços que tem no binario
// 28: transforma o binario em um map (array)
// 29: transforma o binario em decimal
// 30: retorna o decimal em formato de string
// 32: retira os espaços da string
module.exports = app;

// O listen só roda se você estiver no seu PC
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log('[*] SERVIDOR LOCAL ONLINE NA PORTA: ', PORT);
    });
}