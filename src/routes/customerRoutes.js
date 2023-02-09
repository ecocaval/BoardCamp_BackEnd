//* Libraries
import { Router } from "express";

//* Controllers
import { getCustomers, registerCostumer } from "../controllers/customersController/customersController.js";

//* Middlewares
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateCustomerBody } from "../middlewares/customers/validateCustomerBody.js";
import { validateCustomerCpf } from "../middlewares/customers/validateCustomerCpf.js";

//* Schemas
import { registerCustomerSchema } from "../schemas/registerCustomerSchema.js";

const customerRoutes = Router()

customerRoutes.get("/customers", getCustomers)

customerRoutes.post("/customers", validateSchema(registerCustomerSchema), validateCustomerBody, validateCustomerCpf, registerCostumer)

export default customerRoutes