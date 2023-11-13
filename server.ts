import dotenv from "dotenv";
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from 'cors';
import MainController from "./Controller/Controller";
const {
  LoginController , RegisterController , InputNewModelController,
  IncrementTransactionController, GetAllModelController, GetDetailModelController,
  ChangePassword, AddGroup, AddModel
} = MainController;
import createIOTServices from "./Network_and_Database_Services/IOTServices";

const app = express();
dotenv.config();
async function initializeServer() {
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
  app.post('/api/add-model', AddModel);
  app.post('/api/add-group', AddGroup);
  app.get('/api/nama-endpoint/:username');
  

  const server = http.createServer(app);
  createIOTServices(server);

  const PORT = (process.env.PORT as number | undefined) || 4000;
  const HOST = process.env.SERVER_HOST || '127.0.0.1';

  server.listen(PORT, HOST , () => {
    console.log(`Server is running on port ${PORT}`);
  })
}

initializeServer().catch((err) => console.log(`Gagal membuat server : ${err}`))