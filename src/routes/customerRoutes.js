//* Libraries
import { Router } from "express";

//* Controllers
import { getCustomerById, getCustomers, registerCostumer } from "../controllers/customersController/customersController.js";

//* Middlewares
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateCustomerBody } from "../middlewares/customers/validateCustomerBody.js";
import { validateCustomerCpf } from "../middlewares/customers/validateCustomerCpf.js";

//* Schemas
import { registerCustomerSchema } from "../schemas/registerCustomerSchema.js";

const customerRouter = Router()

customerRouter.get("/customers", getCustomers)

customerRouter.get("/customers/:id", getCustomerById)

customerRouter.post("/customers", validateSchema(registerCustomerSchema), validateCustomerBody, validateCustomerCpf, registerCostumer)

export default customerRouter