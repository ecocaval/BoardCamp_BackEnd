//* Libraries
import { Router } from "express";

import { getCustomers } from "../controllers/customersController/customersController.js";

const customerRoutes = Router()

customerRoutes.get("/customers", getCustomers)

export default customerRoutes