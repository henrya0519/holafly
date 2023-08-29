const express = require('express');
const applyEndpoints = require('./endpoints');
const applyMiddlewares = require('./middlewares');
const cors = require("cors");  
const createExpressServer = async app => {
	const server = express();
	server.set("etag", false);
	server.use(cors());
	server.use(express.json());
	server.use(express.urlencoded({ extended: false }));
	applyMiddlewares(server, app);
	applyEndpoints(server, app);


    await app.db.initDB();

	server.get('/', async (req, res) => {
		if(process.env.NODE_ENV === 'develop'){
				res.send('Iniciamos pruebas');
		} else {
		    res.sendStatus(200);
		}
    });

	return server;
};

module.exports = createExpressServer;