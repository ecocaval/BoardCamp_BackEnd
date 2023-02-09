//* Libraries
import { Router } from "express";

//* Controllers
import {
    getCustomerById,
    getCustomers,
    registerCostumer,
    updateCustomerById
} from "../controllers/customersController/customersController.js";

//* Middlewares
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateCustomerBody } from "../middlewares/customers/validateCustomerBody.js";
import { validateCustomerCpf } from "../middlewares/customers/validateCustomerCpf.js";

//* Schemas
import { registerCustomerSchema } from "../schemas/registerCustomerSchema.js";
import { updateCustomerSchema } from "../schemas/updateCustomerSchema.js";

const customerRouter = Router()

customerRouter.get("/customers", getCustomers)

customerRouter.get("/customers/:id", getCustomerById)

customerRouter.post("/customers", validateSchema(registerCustomerSchema), validateCustomerBody, validateCustomerCpf, registerCostumer)

customerRouter.put("/customers/:id", validateSchema(updateCustomerSchema), validateCustomerBody, validateCustomerCpf, updateCustomerById)

export default customerRouter