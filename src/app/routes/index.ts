import { Router } from "express";
import { BookRoutes } from "./book.route";
import { BorrowRoutes } from "./borrow.route";

const routes = Router();

routes.use("/books", BookRoutes);

routes.use("/borrow", BorrowRoutes);

export default routes;
