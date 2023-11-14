import RegisterController from "./Authentication/RegisterController";
import GetAllModelController from "./Model/GetAllModelController";
import GetDetailModelController from "./Model/GetDetailModelController";
import LoginController from "./Authentication/LoginController";
import IncrementTransactionController from "./Model/IncrementTransactionController";
import InputNewTransactionController from "./Model/InputNewModelController";
import ChangePassword from "./Model/ChangePassword";
import AddGroup from "./Model/AddGroup";
import AddModel from "./Model/AddModel";
import GetFormData from "./Model/GetFormData";

const Controller = {
    RegisterController,
    GetDetailModelController,
    GetAllModelController,
    LoginController,
    IncrementTransactionController,
    InputNewTransactionController,
    ChangePassword,
    AddGroup,
    AddModel,
    GetFormData
};

export default Controller;