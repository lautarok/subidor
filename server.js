const express = require('express'),
	multer = require('multer')

const storage = multer.diskStorage({
	destination: 'uploads',
	filename: (_, file, cb) => {
		cb(null, file.originalname)
	}
})

const upload = multer({ storage })

const app = express()

app.use(express.json({
	limit: '900mb'
}))
app.use(express.urlencoded({
	extended: true,
	parameterLimit: 50000,
	limit: '900mb'
}))

app.use(express.static('static'))

app.post('/upload', upload.single('file'), (_, res) => {
	res.sendStatus(200)
})

app.listen(80, () => {
	console.log('Servidor escuchando el puerto 80')
})