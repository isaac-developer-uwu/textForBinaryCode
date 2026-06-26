const texto = '01110100 01100101 01110011 01110100 01100101'
const stringConvertida = texto.split(' ')
.map(bin => {
	const decimal = parseInt(bin, 2)
	return String.fromCharCode(decimal)
})
.join(' ')