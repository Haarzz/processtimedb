import RegisterController from "./Authentication/RegisterController";
import GetAllModelController from "./Model/GetAllModelController";
import GetDetailModelController from "./Model/GetDetailModelController";
import LoginController from "./Authentication/LoginController";
import IncrementTransactionController from "./Model/IncrementTransactionController";
import InputNewModelController from "./Model/InputNewModelController";
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
    InputNewModelController,
    ChangePassword,
    AddGroup,
    AddModel,
    GetFormData
};

export default Controller;