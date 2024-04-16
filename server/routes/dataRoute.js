import express from "express";
import { create, getAll, getOne, update, deleteOrder,getAllView,downloadJSON} from "../controller/dataController.js";

const route = express.Router();

route.post("/create", create);
route.get("/getall", getAll);
route.get("/getallView", getAllView);
route.get("/getone/:id", getOne);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteOrder);
route.get("/download", downloadJSON);


export default route;