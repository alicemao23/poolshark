const app = require('express')(),
	  request = require('request'),
	  cheerio = require('cheerio'),
	 mongoose = require('mongoose'),
	   agenda = require('agenda'),
	   config = require('config'),
//	 dbConfig = config.get('Dev.dbConfig')
     PORT = process.env.PORT || 8080

mongoose.connect('mongodb://localhost/data/db/')
mongoose.Promise = global.Promise

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
		console.log("Connected to db at /data/db/")
})

app.get('/', (req,res)=>{
	    console.log('Request on the index.')
	    res.send('We wylin out.')
})

app.get('/forwarded', (req, res)=>{
	console.log('forwarded was hit');
	res.json({"msg":"we're gonna need a bigger port"});
});

app.listen(PORT, ()=>{
	    console.log(`Express listening on ${PORT}`)
	    console.log(`CTRL+C to kill process.`)
})
