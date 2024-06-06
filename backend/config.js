const { Client } = require("pg");

const client = new Client("postgres://advaitpadhye:123@localhost:5432/lab4db"); //Configuring PostgresSQL Database

module.exports = client;
