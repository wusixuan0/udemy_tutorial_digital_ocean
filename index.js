const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

DATABASE_URL='postgres://user:password@localhost:5432/db' // TODO .env
const sequelize = new Sequelize(DATABASE_URL, {
	dialect: 'postgres',
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false
		}
	}
});

const SensorData = sequelize.define('sensor-data', { // model name
	serial: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	temperature: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
})
const app = express();
app.use(express.json());

const dataList = ['deploy tutorial tests',"expresso"];

app.get ('/', async (req, res) => { 
	const allData = await SensorData.findAll();
	res.status(200).send(allData);
	return;
});

app.post ('/data', async (req, res) => {
	let data = req.body;
	const sensorData = await SensorData.create(data);
	dataList.push(data);
	res.status(201).send(dataList);
	return;
});

const port = 8080;

app.listen({ port }, () => {
	try {
		sequelize.authenticate();
		console.log ('Connected to database');
		sequelize.sync({ alter: true });
		console.log ('>>>>>>>>>>>Sync to database');
	} catch (error) {
		console.log ('Could not connected to database', error);
	}
  console.log(`Server is running on http://localhost:${port}`);
});