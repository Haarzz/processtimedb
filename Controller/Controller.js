const RegisterController = require("./Authentication/RegisterController.js");
const GetAllModelController = require("./Model/GetAllModelController.js");
const GetDetailModelController = require("./Model/GetDetailModelController.js");
const LoginController = require("./Authentication/LoginController.js");
const IncrementTransactionController = require("./Model/IncrementTransactionController.js");
const InputNewModelController = require("./Model/InputNewModelController.js");

const Controller = {
    RegisterController,
    GetDetailModelController,
    GetAllModelController,
    LoginController,
    IncrementTransactionController,
    InputNewModelController
};

module.exports = Controller;