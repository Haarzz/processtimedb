require('dotenv').config();
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const MainController = require("./Controller/Controller.js");
const {
  LoginController , RegisterController , InputNewModelController,
  IncrementTransactionController, GetAllModelController, GetDetailModelController, ChangePassword,
} = MainController;
const createIOTServices = require("./Network_and_Database_Services/IOTServices");
const initializeDB = require("./Network_and_Database_Services/DBService");

async function initializeServer() {
  await initializeDB();
  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  app.get('/api/alldata', GetAllModelController);
  app.get('/api/detail-model/:id', GetDetailModelController);
  app.get('/api/get-model/:id', GetDetailModelController);
  app.put('/api/increment-transaction/:id', IncrementTransactionController);
  app.post("/formData", InputNewModelController);
  app.post('/api/register', RegisterController);
  app.post('/api/login', LoginController);
  app.post('/api/change-password' , ChangePassword);

  const server = http.createServer(app);
  await createIOTServices(server);

  const PORT = process.env.PORT || 4000;
  server.listen(PORT, process.env.SERVER_HOST || '127.0.0.1' , () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

initializeServer().catch((err) => console.log(err));