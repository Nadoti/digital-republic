import { Router } from "express";
import { ensureAuthenticateUser } from "./middleware/ensureAuthenticateUser";
import { TakeBalanceController } from "./modules/balance/useCase/takeBalance/TakeBalanceController";
import { CreateTransactionController } from "./modules/transactions/useCase/createTransactions/CreateTransactionsController";
import { TakeAllTransactionsController } from "./modules/transactions/useCase/takeAllTransactions/TakeAllTransactionsController";
import { AuthenticateUserController } from "./modules/users/useCase/authenticateUsers/AuthenticateUserController";
import { CreateUserController } from "./modules/users/useCase/createUsers/CreateUserController";

const routes = Router()

const createUseController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const createTransactionsController = new CreateTransactionController()
const takeBalanceController = new TakeBalanceController()
const takeAllTransactionsController = new TakeAllTransactionsController()

routes.post("/user/create", createUseController.handle)
routes.post("/user/authenticate", authenticateUserController.handle)

routes.post("/user/transaction", ensureAuthenticateUser, createTransactionsController.handle)

routes.post("/user/balance", ensureAuthenticateUser, takeBalanceController.handle)
routes.post("/user/transactions", ensureAuthenticateUser, takeAllTransactionsController.handle)

export { routes }