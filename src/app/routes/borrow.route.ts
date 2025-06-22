import { Router } from "express";
import { BorrowControllers } from "../controllers/borrow.controller";

const router = Router();

router.get("/", BorrowControllers.borrowedBooksSummary);

router.post("/", BorrowControllers.borrowBook);

export const BorrowRoutes = router;
