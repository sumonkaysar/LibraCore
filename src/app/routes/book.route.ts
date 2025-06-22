import { Router } from "express";
import { BookControllers } from "../controllers/book.controller";

const router = Router();

router.get("/:bookId", BookControllers.getBookById);

router.get("/", BookControllers.getAllBooks);

router.post("/", BookControllers.createBook);

router.patch("/:bookId", BookControllers.updateBookById);

router.delete("/:bookId", BookControllers.deleteBookById);

export const BookRoutes = router;
