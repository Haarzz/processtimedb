const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const MainController = require("./Controller/Controller.js");
const {
  LoginController , RegisterController , InputNewModelController,
  IncrementTransactionController, GetAllModelController, GetDetailModelController,
} = MainController;
const createIOTServices = require("./Network_and_Database_Services/IOTServices");

async function initializeServer() {
  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());


// ************************************************** API ****************************************************************
  app.get('/api/alldata', GetAllModelController);
  app.get('/api/detail-model/:id', GetDetailModelController);
  app.get('/api/get-model/:id', GetDetailModelController);
  app.put('/api/increment-transaction/:id', IncrementTransactionController);
  app.post("/formData", InputNewModelController);
  app.post('/api/register', RegisterController);
  app.post('/api/login', LoginController);

  const server = http.createServer(app);
  createIOTServices(server);

  const PORT = process.env.PORT || 4000;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

initializeServer().catch((err) => console.log(err));